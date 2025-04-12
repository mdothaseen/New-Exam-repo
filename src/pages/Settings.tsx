
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Save, Shield, Key, Lock, Bell, User, Users } from 'lucide-react';

const rolePermissions = [
  { 
    role: "Administrator",
    permissions: {
      dashboard: true,
      userManagement: true,
      contentManagement: true,
      assessmentManagement: true,
      monitoring: true,
      reports: true,
      settings: true
    }
  },
  { 
    role: "Assessor",
    permissions: {
      dashboard: true,
      userManagement: false,
      contentManagement: false,
      assessmentManagement: true,
      monitoring: true,
      reports: true,
      settings: false
    }
  },
  { 
    role: "SSC Representative",
    permissions: {
      dashboard: true,
      userManagement: false,
      contentManagement: true,
      assessmentManagement: true,
      monitoring: false,
      reports: true,
      settings: false
    }
  },
  { 
    role: "Training Partner",
    permissions: {
      dashboard: true,
      userManagement: false,
      contentManagement: false,
      assessmentManagement: true,
      monitoring: false,
      reports: true,
      settings: false
    }
  },
  { 
    role: "NCVET Observer",
    permissions: {
      dashboard: true,
      userManagement: false,
      contentManagement: false,
      assessmentManagement: false,
      monitoring: true,
      reports: true,
      settings: false
    }
  }
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage system settings and configurations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general platform settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Platform Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Basic information about the platform
                    </p>
                  </div>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input
                        id="platform-name"
                        placeholder="Platform Name"
                        defaultValue="Skill Pulse Exam Hub"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="Admin Email"
                        defaultValue="admin@skillpulse.org"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-number">Contact Number</Label>
                      <Input
                        id="contact-number"
                        type="tel"
                        placeholder="Contact Number"
                        defaultValue="+91 11 2345 6789"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Regional Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure regional preferences
                    </p>
                  </div>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input
                        id="timezone"
                        placeholder="Timezone"
                        defaultValue="Asia/Kolkata (GMT+5:30)"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Input
                        id="date-format"
                        placeholder="Date Format"
                        defaultValue="DD/MM/YYYY"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="automated-reports" />
                  <Label htmlFor="automated-reports">Enable automated reports</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Maintenance mode</Label>
                </div>

                <Button className="bg-skill-blue hover:bg-skill-blue/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Password Policy</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure password requirements for all users
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="min-length" defaultChecked />
                        <Label htmlFor="min-length">Minimum Password Length</Label>
                      </div>
                      <Input
                        className="w-16 text-center"
                        type="number"
                        defaultValue="8"
                        min="8"
                        max="20"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="require-uppercase" defaultChecked />
                      <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="require-numbers" defaultChecked />
                      <Label htmlFor="require-numbers">Require numbers</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="require-symbols" />
                      <Label htmlFor="require-symbols">Require symbols</Label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="password-expiry" defaultChecked />
                        <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                      </div>
                      <Input
                        className="w-16 text-center"
                        type="number"
                        defaultValue="90"
                        min="30"
                        max="180"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Session Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure session timeouts and security settings
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="session-timeout" defaultChecked />
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      </div>
                      <Input
                        className="w-16 text-center"
                        type="number"
                        defaultValue="30"
                        min="5"
                        max="120"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="enforce-2fa" />
                      <Label htmlFor="enforce-2fa">Enforce Two-Factor Authentication</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="ip-restriction" />
                      <Label htmlFor="ip-restriction">IP Address Restriction</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Assessment Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure security settings for assessment sessions
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="face-verification" defaultChecked />
                      <Label htmlFor="face-verification">Require Face Verification</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="id-verification" defaultChecked />
                      <Label htmlFor="id-verification">Require ID Verification</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="screen-monitoring" defaultChecked />
                      <Label htmlFor="screen-monitoring">Enable Screen Monitoring</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="browser-lock" defaultChecked />
                      <Label htmlFor="browser-lock">Enable Secure Browser Lock</Label>
                    </div>
                  </div>
                </div>

                <Button className="bg-skill-blue hover:bg-skill-blue/90">
                  <Shield className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>
                  Configure access permissions for different user roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Role</TableHead>
                      <TableHead className="text-center">Dashboard</TableHead>
                      <TableHead className="text-center">Users</TableHead>
                      <TableHead className="text-center">Content</TableHead>
                      <TableHead className="text-center">Assessments</TableHead>
                      <TableHead className="text-center">Monitoring</TableHead>
                      <TableHead className="text-center">Reports</TableHead>
                      <TableHead className="text-center">Settings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rolePermissions.map((role) => (
                      <TableRow key={role.role}>
                        <TableCell className="font-medium">{role.role}</TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-dashboard`} 
                            defaultChecked={role.permissions.dashboard} 
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-users`} 
                            defaultChecked={role.permissions.userManagement} 
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-content`} 
                            defaultChecked={role.permissions.contentManagement} 
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-assessments`} 
                            defaultChecked={role.permissions.assessmentManagement} 
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-monitoring`} 
                            defaultChecked={role.permissions.monitoring} 
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-reports`} 
                            defaultChecked={role.permissions.reports} 
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-settings`} 
                            defaultChecked={role.permissions.settings} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="advanced-permissions">
                      <AccordionTrigger>Advanced Permission Settings</AccordionTrigger>
                      <AccordionContent>
                        <div className="p-4 space-y-4 border rounded">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Key className="h-4 w-4 text-muted-foreground" />
                              <h4 className="font-medium">Custom Permission Groups</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Configure custom permission groups for specialized access control
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full">
                              <Users className="h-4 w-4 mr-2" />
                              Add New Role
                            </Button>
                            
                            <Button variant="outline" size="sm" className="w-full">
                              <User className="h-4 w-4 mr-2" />
                              Edit User Permissions
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="mt-6">
                  <Button className="bg-skill-blue hover:bg-skill-blue/90">
                    <Lock className="mr-2 h-4 w-4" />
                    Save Permission Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure when email notifications are sent
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-assessment-scheduled" defaultChecked />
                      <Label htmlFor="email-assessment-scheduled">Assessment Scheduled</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="email-assessment-reminder" defaultChecked />
                      <Label htmlFor="email-assessment-reminder">Assessment Reminders</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="email-results-available" defaultChecked />
                      <Label htmlFor="email-results-available">Results Available</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="email-certificate-issued" defaultChecked />
                      <Label htmlFor="email-certificate-issued">Certificate Issued</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="email-system-alerts" defaultChecked />
                      <Label htmlFor="email-system-alerts">System Alerts</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure when SMS notifications are sent
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-assessment-scheduled" defaultChecked />
                      <Label htmlFor="sms-assessment-scheduled">Assessment Scheduled</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="sms-assessment-reminder" defaultChecked />
                      <Label htmlFor="sms-assessment-reminder">Assessment Reminders</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="sms-results-available" />
                      <Label htmlFor="sms-results-available">Results Available</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">System Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure in-app notifications
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="notify-assessment-alerts" defaultChecked />
                      <Label htmlFor="notify-assessment-alerts">Assessment Alerts</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notify-proctoring-alerts" defaultChecked />
                      <Label htmlFor="notify-proctoring-alerts">Proctoring Alerts</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notify-system-updates" defaultChecked />
                      <Label htmlFor="notify-system-updates">System Updates</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="desktop-notifications" />
                      <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                    </div>
                  </div>
                </div>

                <Button className="bg-skill-blue hover:bg-skill-blue/90">
                  <Bell className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
