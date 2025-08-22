import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  Avatar
} from '@mui/material';
import {
  Help as HelpIcon,
  ExpandMore as ExpandMoreIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Description as DocumentationIcon,
  VideoLibrary as VideoIcon,
  BugReport as BugReportIcon,
  Feedback as FeedbackIcon,
  QuestionAnswer as FAQIcon,
  Support as SupportIcon,
  School as TutorialIcon,
  Forum as CommunityIcon,
  Send as SendIcon
} from '@mui/icons-material';

function HelpSupport() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const [expandedFAQ, setExpandedFAQ] = useState(false);

  const handleFormChange = (field) => (event) => {
    setContactForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmitContact = () => {
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
      priority: 'medium'
    });
  };

  const handleFAQChange = (panel) => (event, isExpanded) => {
    setExpandedFAQ(isExpanded ? panel : false);
  };

  const faqData = [
    {
      id: 'faq1',
      question: 'How do I create a new dashboard?',
      answer: 'To create a new dashboard, navigate to the "Create New" section from the sidebar menu. You can choose from various templates or start with a blank dashboard. Customize it by adding widgets, charts, and data sources according to your needs.'
    },
    {
      id: 'faq2',
      question: 'How can I share my dashboard with others?',
      answer: 'You can share your dashboard by clicking the "Share" button in the dashboard toolbar. You can generate a shareable link, invite specific users via email, or export the dashboard as a PDF. You can also set different permission levels for viewers and editors.'
    },
    {
      id: 'faq3',
      question: 'Can I customize the theme and appearance?',
      answer: 'Yes! Go to the Themes page from the sidebar to customize colors, layouts, and visual preferences. You can choose from predefined themes or create your own custom theme. Changes are applied instantly across all your dashboards.'
    },
    {
      id: 'faq4',
      question: 'How do I connect external data sources?',
      answer: 'In the dashboard editor, click "Add Data Source" and choose from our supported integrations including databases, APIs, CSV files, and cloud services. Follow the connection wizard to authenticate and configure your data source.'
    },
    {
      id: 'faq5',
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We use enterprise-grade encryption for data in transit and at rest. Your data is never shared with third parties, and you have full control over access permissions. We are SOC 2 compliant and follow industry best practices for data security.'
    },
    {
      id: 'faq6',
      question: 'How can I export my dashboard data?',
      answer: 'You can export dashboard data in multiple formats including PDF, PNG, CSV, and Excel. Use the export button in the dashboard toolbar or schedule automated exports to be sent to your email or cloud storage.'
    }
  ];

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <ChatIcon />,
      action: 'Start Chat',
      available: true
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: <EmailIcon />,
      action: 'Send Email',
      available: true
    },
    {
      title: 'Phone Support',
      description: 'Call our support hotline',
      icon: <PhoneIcon />,
      action: 'Call Now',
      available: false,
      note: 'Available Mon-Fri 9AM-6PM EST'
    }
  ];

  const resources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      icon: <DocumentationIcon />,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: <VideoIcon />,
      link: '#'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: <CommunityIcon />,
      link: '#'
    },
    {
      title: 'Getting Started',
      description: 'Quick start guide for new users',
      icon: <TutorialIcon />,
      link: '#'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <HelpIcon fontSize="large" />
        Help & Support
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We're here to help! Find answers to common questions, contact our support team, or explore our resources.
      </Typography>

      <Grid container spacing={4}>
        {/* Quick Support Options */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Get Support
          </Typography>
          <Grid container spacing={3}>
            {supportOptions.map((option, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        {option.icon}
                      </Avatar>
                      <Typography variant="h6">
                        {option.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {option.description}
                    </Typography>
                    {option.note && (
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        {option.note}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      disabled={!option.available}
                      startIcon={option.icon}
                    >
                      {option.action}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Support
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={contactForm.name}
                  onChange={handleFormChange('name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleFormChange('email')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={contactForm.category}
                    onChange={handleFormChange('category')}
                    label="Category"
                  >
                    <MenuItem value="technical">Technical Issue</MenuItem>
                    <MenuItem value="billing">Billing Question</MenuItem>
                    <MenuItem value="feature">Feature Request</MenuItem>
                    <MenuItem value="bug">Bug Report</MenuItem>
                    <MenuItem value="general">General Inquiry</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={contactForm.priority}
                    onChange={handleFormChange('priority')}
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={contactForm.subject}
                  onChange={handleFormChange('subject')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={contactForm.message}
                  onChange={handleFormChange('message')}
                  placeholder="Please describe your issue or question in detail..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={handleSubmitContact}
                  disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Resources */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Resources
          </Typography>
          <List>
            {resources.map((resource, index) => (
              <ListItem key={index} component={Link} href={resource.link} sx={{ textDecoration: 'none' }}>
                <ListItemIcon>
                  {resource.icon}
                </ListItemIcon>
                <ListItemText
                  primary={resource.title}
                  secondary={resource.description}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* FAQ Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Frequently Asked Questions
          </Typography>
          {faqData.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expandedFAQ === faq.id}
              onChange={handleFAQChange(faq.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${faq.id}-content`}
                id={`${faq.id}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        {/* Additional Help */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Still need help?
            </Typography>
            <Typography>
              Our support team is available 24/7 to assist you. You can also check our{' '}
              <Link href="#" underline="hover">status page</Link> for any ongoing issues or{' '}
              <Link href="#" underline="hover">schedule a demo</Link> with our team.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HelpSupport;