import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        CMS Dashboard
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Card style={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h6">Users</Typography>
            <Typography variant="body2">Manage users, roles, and permissions.</Typography>
          </CardContent>
        </Card>
        <Card style={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h6">Content</Typography>
            <Typography variant="body2">Create, edit, and manage content.</Typography>
          </CardContent>
        </Card>
        <Card style={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h6">Settings</Typography>
            <Typography variant="body2">Manage CMS settings and configurations.</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Dashboard;