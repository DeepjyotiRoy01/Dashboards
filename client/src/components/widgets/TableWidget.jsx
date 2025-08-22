import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  CircularProgress,
  Typography,
  Chip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { mockDataService } from '../../utils/api';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 300,
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: alpha(theme.palette.text.primary, 0.05),
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.text.primary, 0.2),
    borderRadius: '4px',
    '&:hover': {
      background: alpha(theme.palette.text.primary, 0.3),
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '8px 16px',
  fontSize: '0.875rem',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  padding: '8px 16px',
  fontSize: '0.875rem',
  fontWeight: 600,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(theme.palette.action.hover, 0.04),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.action.hover, 0.1),
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 300,
  width: '100%',
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  let color = theme.palette.info.main;
  let backgroundColor = alpha(theme.palette.info.main, 0.1);
  
  if (status === 'completed' || status === 'active' || status === 'paid') {
    color = theme.palette.success.main;
    backgroundColor = alpha(theme.palette.success.main, 0.1);
  } else if (status === 'pending' || status === 'in progress') {
    color = theme.palette.warning.main;
    backgroundColor = alpha(theme.palette.warning.main, 0.1);
  } else if (status === 'cancelled' || status === 'failed' || status === 'overdue') {
    color = theme.palette.error.main;
    backgroundColor = alpha(theme.palette.error.main, 0.1);
  }
  
  return {
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: '4px',
    fontSize: '0.75rem',
    height: '24px',
  };
});

const TableWidget = ({ data, settings, loading }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(loading || true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would fetch from the API based on settings.dataSource
        // For now, we'll use mock data
        let result;
        switch (settings?.dataSource) {
          case 'sales':
            result = await mockDataService.getSalesData();
            break;
          case 'analytics':
            result = await mockDataService.getAnalyticsData();
            break;
          case 'finance':
            result = await mockDataService.getFinanceData();
            break;
          case 'marketing':
            result = await mockDataService.getMarketingData();
            break;
          case 'hr':
            result = await mockDataService.getHRData();
            break;
          default:
            // Default mock data
            result = {
              data: [
                { id: 1, name: 'Product A', category: 'Electronics', price: '$299', status: 'In Stock' },
                { id: 2, name: 'Product B', category: 'Clothing', price: '$59', status: 'Low Stock' },
                { id: 3, name: 'Product C', category: 'Home', price: '$129', status: 'Out of Stock' },
                { id: 4, name: 'Product D', category: 'Electronics', price: '$499', status: 'In Stock' },
                { id: 5, name: 'Product E', category: 'Books', price: '$19', status: 'In Stock' },
                { id: 6, name: 'Product F', category: 'Toys', price: '$39', status: 'Low Stock' },
              ],
              columns: [
                { id: 'id', label: 'ID', type: 'number' },
                { id: 'name', label: 'Name', type: 'string' },
                { id: 'category', label: 'Category', type: 'string' },
                { id: 'price', label: 'Price', type: 'string' },
                { id: 'status', label: 'Status', type: 'status' },
              ],
            };
        }

        setTableData(result.data);
        setColumns(result.columns || []);
      } catch (err) {
        console.error('Error fetching table data:', err);
        setError('Failed to load table data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [settings?.dataSource]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = (data, comparator) => {
    return data.slice().sort(comparator);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const renderCellContent = (column, value) => {
    if (!column || !column.type) return value;

    switch (column.type.toLowerCase()) {
      case 'status':
        return <StatusChip label={value} status={value.toLowerCase()} size="small" />;
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return value;
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress size={30} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Loading table data...
        </Typography>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </LoadingContainer>
    );
  }

  if (!tableData.length || !columns.length) {
    return (
      <LoadingContainer>
        <Typography variant="body2" color="text.secondary">
          No data available
        </Typography>
      </LoadingContainer>
    );
  }

  const sortedData = orderBy ? sortData(tableData, getComparator(order, orderBy)) : tableData;
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <StyledTableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableHeaderCell key={column.id} sortDirection={orderBy === column.id ? order : false}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </StyledTableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((column) => (
                  <StyledTableCell key={column.id}>
                    {renderCellContent(column, row[column.id])}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TableWidget;