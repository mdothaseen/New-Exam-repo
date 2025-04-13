import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { Save, Shield, Key, Lock, Bell, User, Users, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Add state for role permissions
  const [permissions, setPermissions] = useState(rolePermissions);
  
  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "Cee Vision Technologies Private Limited",
    adminEmail: "admin@ceevision.com",
    contactNumber: "+91 8006685100",
    timezone: "Asia/Kolkata (GMT+5:30)",
    dateFormat: "DD/MM/YYYY",
    automatedReports: true,
    maintenanceMode: false
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
    enforce2FA: false,
    ipRestriction: false,
    faceVerification: true,
    idVerification: true,
    screenMonitoring: true,
    browserLock: true
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailAssessmentScheduled: true,
    emailAssessmentReminder: true,
    emailResultsAvailable: true,
    emailCertificateIssued: true,
    emailSystemAlerts: true,
    smsAssessmentScheduled: true,
    smsAssessmentReminder: true,
    smsResultsAvailable: false,
    notifyAssessmentAlerts: true,
    notifyProctoringAlerts: true,
    notifySystemUpdates: true,
    desktopNotifications: false
  });

  // Add state to track if settings have been modified
  const [hasGeneralChanges, setHasGeneralChanges] = useState(false);
  const [hasSecurityChanges, setHasSecurityChanges] = useState(false);
  const [hasPermissionChanges, setHasPermissionChanges] = useState(false);
  const [hasNotificationChanges, setHasNotificationChanges] = useState(false);
  
  // Add loading states
  const [isGeneralSaving, setIsGeneralSaving] = useState(false);
  const [isSecuritySaving, setIsSecuritySaving] = useState(false);
  const [isPermissionSaving, setIsPermissionSaving] = useState(false);
  const [isNotificationSaving, setIsNotificationSaving] = useState(false);
  
  // Add state for confirm dialog with proper typing
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);
  
  // Add state for success dialog
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Check for unsaved changes
  const hasUnsavedChanges = hasGeneralChanges || hasSecurityChanges || 
    hasPermissionChanges || hasNotificationChanges;
  
  // Handle tab change with confirmation
  const handleTabChange = (value: string) => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
      setPendingNavigation(() => {
        return () => setActiveTab(value);
      });
    } else {
      setActiveTab(value);
    }
  };

  // Confirm navigation and discard changes
  const confirmNavigation = () => {
    setShowConfirmDialog(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  // Cancel navigation
  const cancelNavigation = () => {
    setShowConfirmDialog(false);
    setPendingNavigation(null);
  };

  // Add beforeunload handler for browser navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Update general settings handler
  const handleGeneralSettingChange = (e) => {
    const { id, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [id.replace('general-', '')]: value
    }));
    setHasGeneralChanges(true);
  };

  // Update security settings handler
  const handleSecuritySettingChange = (e) => {
    const { id, value } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [id.replace('security-', '')]: value
    }));
    setHasSecurityChanges(true);
  };

  // Switch Toggle Handler
  const handleSwitchToggle = (id) => {
    if (id.startsWith('general-')) {
      const key = id.replace('general-', '');
      setGeneralSettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
      setHasGeneralChanges(true);
    } else if (id.startsWith('security-')) {
      const key = id.replace('security-', '');
      setSecuritySettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
      setHasSecurityChanges(true);
    } else {
      setNotificationSettings(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
      setHasNotificationChanges(true);
    }
  };

  // Update permission changes handler
  const handlePermissionChange = (role, permission) => {
    setPermissions(prev => prev.map(item => {
      if (item.role === role) {
        return {
          ...item,
          permissions: {
            ...item.permissions,
            [permission]: !item.permissions[permission]
          }
        };
      }
      return item;
    }));
    setHasPermissionChanges(true);
  };

  // Save handlers with success dialog instead of automatic redirection
  const saveGeneralSettings = () => {
    setIsGeneralSaving(true);
    console.log("Saving general settings:", generalSettings);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "General Settings Saved",
        description: "Your general settings have been successfully updated",
      });
      setHasGeneralChanges(false);
      setIsGeneralSaving(false);
      
      // Show success dialog instead of automatic redirection
      setSuccessMessage("General settings have been successfully saved.");
      setShowSuccessDialog(true);
    }, 1000);
  };

  const saveSecuritySettings = () => {
    setIsSecuritySaving(true);
    console.log("Saving security settings:", securitySettings);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Security Settings Saved",
        description: "Your security settings have been successfully updated",
      });
      setHasSecurityChanges(false);
      setIsSecuritySaving(false);
      
      // Show success dialog instead of automatic redirection
      setSuccessMessage("Security settings have been successfully saved.");
      setShowSuccessDialog(true);
    }, 1000);
  };

  const savePermissionSettings = () => {
    setIsPermissionSaving(true);
    console.log("Saving permission settings:", permissions);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Permission Settings Saved",
        description: "Role permissions have been successfully updated",
      });
      setHasPermissionChanges(false);
      setIsPermissionSaving(false);
      
      // Show success dialog instead of automatic redirection
      setSuccessMessage("Permission settings have been successfully saved.");
      setShowSuccessDialog(true);
    }, 1000);
  };

  const saveNotificationSettings = () => {
    setIsNotificationSaving(true);
    console.log("Saving notification settings:", notificationSettings);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification Settings Saved",
        description: "Your notification preferences have been successfully updated",
      });
      setHasNotificationChanges(false);
      setIsNotificationSaving(false);
      
      // Show success dialog instead of automatic redirection
      setSuccessMessage("Notification settings have been successfully saved.");
      setShowSuccessDialog(true);
    }, 1000);
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Close success dialog and stay on settings page
  const stayOnSettingsPage = () => {
    setShowSuccessDialog(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage system settings and configurations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure general platform settings and preferences
                    </CardDescription>
                  </div>
                  {hasGeneralChanges && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      Unsaved Changes
                    </Badge>
                  )}
                </div>
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
                      <Label htmlFor="general-platformName">Platform Name</Label>
                      <Input
                        id="general-platformName"
                        placeholder="Platform Name"
                        value={generalSettings.platformName}
                        onChange={handleGeneralSettingChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="general-adminEmail">Admin Email</Label>
                      <Input
                        id="general-adminEmail"
                        type="email"
                        placeholder="Admin Email"
                        value={generalSettings.adminEmail}
                        onChange={handleGeneralSettingChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="general-contactNumber">Contact Number</Label>
                      <Input
                        id="general-contactNumber"
                        type="tel"
                        placeholder="Contact Number"
                        value={generalSettings.contactNumber}
                        onChange={handleGeneralSettingChange}
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
                      <Label htmlFor="general-timezone">Timezone</Label>
                      <Input
                        id="general-timezone"
                        placeholder="Timezone"
                        value={generalSettings.timezone}
                        onChange={handleGeneralSettingChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="general-dateFormat">Date Format</Label>
                      <Input
                        id="general-dateFormat"
                        placeholder="Date Format"
                        value={generalSettings.dateFormat}
                        onChange={handleGeneralSettingChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="general-automatedReports" 
                    checked={generalSettings.automatedReports}
                    onCheckedChange={() => handleSwitchToggle("general-automatedReports")}
                  />
                  <Label htmlFor="general-automatedReports">Enable automated reports</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="general-maintenanceMode" 
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={() => handleSwitchToggle("general-maintenanceMode")}
                  />
                  <Label htmlFor="general-maintenanceMode">Maintenance mode</Label>
                </div>

                <Button 
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={saveGeneralSettings}
                  disabled={isGeneralSaving}
                >
                  {isGeneralSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security and access control settings
                    </CardDescription>
                  </div>
                  {hasSecurityChanges && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      Unsaved Changes
                    </Badge>
                  )}
                </div>
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
                        <Switch 
                          id="security-minLength"
                          checked={securitySettings.minLength > 0}
                          onCheckedChange={() => handleSwitchToggle("security-minLength")}
                        />
                        <Label htmlFor="security-minLength">Minimum Password Length</Label>
                      </div>
                      <Input
                        className="w-16 text-center"
                        type="number"
                        value={securitySettings.minLength}
                        onChange={handleSecuritySettingChange}
                        min="8"
                        max="20"
                        id="security-minLength"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="security-requireUppercase"
                        checked={securitySettings.requireUppercase}
                        onCheckedChange={() => handleSwitchToggle("security-requireUppercase")}
                      />
                      <Label htmlFor="security-requireUppercase">Require uppercase letters</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="security-requireNumbers"
                        checked={securitySettings.requireNumbers}
                        onCheckedChange={() => handleSwitchToggle("security-requireNumbers")}
                      />
                      <Label htmlFor="security-requireNumbers">Require numbers</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="security-requireSymbols"
                        checked={securitySettings.requireSymbols}
                        onCheckedChange={() => handleSwitchToggle("security-requireSymbols")}
                      />
                      <Label htmlFor="security-requireSymbols">Require symbols</Label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="security-passwordExpiry"
                          checked={securitySettings.passwordExpiry > 0}
                          onCheckedChange={() => handleSwitchToggle("security-passwordExpiry")}
                        />
                        <Label htmlFor="security-passwordExpiry">Password Expiry (days)</Label>
                      </div>
                      <Input
                        className="w-16 text-center"
                        type="number"
                        value={securitySettings.passwordExpiry}
                        onChange={handleSecuritySettingChange}
                        min="30"
                        max="180"
                        id="security-passwordExpiry"
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
                        <Switch 
                          id="security-sessionTimeout"
                          checked={securitySettings.sessionTimeout > 0}
                          onCheckedChange={() => handleSwitchToggle("security-sessionTimeout")}
                        />
                        <Label htmlFor="security-sessionTimeout">Session Timeout (minutes)</Label>
                      </div>
                      <Input
                        className="w-16 text-center"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={handleSecuritySettingChange}
                        min="5"
                        max="120"
                        id="security-sessionTimeout"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="security-enforce2FA"
                        checked={securitySettings.enforce2FA}
                        onCheckedChange={() => handleSwitchToggle("security-enforce2FA")}
                      />
                      <Label htmlFor="security-enforce2FA">Enforce Two-Factor Authentication</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="security-ipRestriction"
                        checked={securitySettings.ipRestriction}
                        onCheckedChange={() => handleSwitchToggle("security-ipRestriction")}
                      />
                      <Label htmlFor="security-ipRestriction">IP Address Restriction</Label>
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
                      <Switch 
                        id="security-faceVerification"
                        checked={securitySettings.faceVerification}
                        onCheckedChange={() => handleSwitchToggle("security-faceVerification")}
                      />
                      <Label htmlFor="security-faceVerification">Require Face Verification</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="security-idVerification"
                        checked={securitySettings.idVerification}
                        onCheckedChange={() => handleSwitchToggle("security-idVerification")}
                      />
                      <Label htmlFor="security-idVerification">Require ID Verification</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="security-screenMonitoring"
                        checked={securitySettings.screenMonitoring}
                        onCheckedChange={() => handleSwitchToggle("security-screenMonitoring")}
                      />
                      <Label htmlFor="security-screenMonitoring">Enable Screen Monitoring</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="security-browserLock"
                        checked={securitySettings.browserLock}
                        onCheckedChange={() => handleSwitchToggle("security-browserLock")}
                      />
                      <Label htmlFor="security-browserLock">Enable Secure Browser Lock</Label>
                    </div>
                  </div>
                </div>

                <Button 
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={saveSecuritySettings}
                  disabled={isSecuritySaving}
                >
                  {isSecuritySaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Save Security Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Role Permissions</CardTitle>
                    <CardDescription>
                      Configure access permissions for different user roles
                    </CardDescription>
                  </div>
                  {hasPermissionChanges && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      Unsaved Changes
                    </Badge>
                  )}
                </div>
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
                    {permissions.map((role) => (
                      <TableRow key={role.role}>
                        <TableCell className="font-medium">{role.role}</TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-dashboard`} 
                            checked={role.permissions.dashboard}
                            onCheckedChange={() => handlePermissionChange(role.role, 'dashboard')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-users`} 
                            checked={role.permissions.userManagement}
                            onCheckedChange={() => handlePermissionChange(role.role, 'userManagement')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-content`} 
                            checked={role.permissions.contentManagement}
                            onCheckedChange={() => handlePermissionChange(role.role, 'contentManagement')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-assessments`} 
                            checked={role.permissions.assessmentManagement}
                            onCheckedChange={() => handlePermissionChange(role.role, 'assessmentManagement')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-monitoring`} 
                            checked={role.permissions.monitoring}
                            onCheckedChange={() => handlePermissionChange(role.role, 'monitoring')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-reports`} 
                            checked={role.permissions.reports}
                            onCheckedChange={() => handlePermissionChange(role.role, 'reports')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            id={`${role.role}-settings`} 
                            checked={role.permissions.settings}
                            onCheckedChange={() => handlePermissionChange(role.role, 'settings')}
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
                  <Button 
                    className="bg-sky-600 hover:bg-sky-700"
                    onClick={savePermissionSettings}
                    disabled={isPermissionSaving}
                  >
                    {isPermissionSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Save Permission Settings
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure system notifications and alerts
                    </CardDescription>
                  </div>
                  {hasNotificationChanges && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      Unsaved Changes
                    </Badge>
                  )}
                </div>
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
                      <Switch 
                        id="emailAssessmentScheduled"
                        checked={notificationSettings.emailAssessmentScheduled}
                        onCheckedChange={() => handleSwitchToggle("emailAssessmentScheduled")}
                      />
                      <Label htmlFor="emailAssessmentScheduled">Assessment Scheduled</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="emailAssessmentReminder"
                        checked={notificationSettings.emailAssessmentReminder}
                        onCheckedChange={() => handleSwitchToggle("emailAssessmentReminder")}
                      />
                      <Label htmlFor="emailAssessmentReminder">Assessment Reminders</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="emailResultsAvailable"
                        checked={notificationSettings.emailResultsAvailable}
                        onCheckedChange={() => handleSwitchToggle("emailResultsAvailable")}
                      />
                      <Label htmlFor="emailResultsAvailable">Results Available</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="emailCertificateIssued"
                        checked={notificationSettings.emailCertificateIssued}
                        onCheckedChange={() => handleSwitchToggle("emailCertificateIssued")}
                      />
                      <Label htmlFor="emailCertificateIssued">Certificate Issued</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="emailSystemAlerts"
                        checked={notificationSettings.emailSystemAlerts}
                        onCheckedChange={() => handleSwitchToggle("emailSystemAlerts")}
                      />
                      <Label htmlFor="emailSystemAlerts">System Alerts</Label>
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
                      <Switch 
                        id="smsAssessmentScheduled"
                        checked={notificationSettings.smsAssessmentScheduled}
                        onCheckedChange={() => handleSwitchToggle("smsAssessmentScheduled")}
                      />
                      <Label htmlFor="smsAssessmentScheduled">Assessment Scheduled</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="smsAssessmentReminder"
                        checked={notificationSettings.smsAssessmentReminder}
                        onCheckedChange={() => handleSwitchToggle("smsAssessmentReminder")}
                      />
                      <Label htmlFor="smsAssessmentReminder">Assessment Reminders</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="smsResultsAvailable"
                        checked={notificationSettings.smsResultsAvailable}
                        onCheckedChange={() => handleSwitchToggle("smsResultsAvailable")}
                      />
                      <Label htmlFor="smsResultsAvailable">Results Available</Label>
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
                      <Switch 
                        id="notifyAssessmentAlerts"
                        checked={notificationSettings.notifyAssessmentAlerts}
                        onCheckedChange={() => handleSwitchToggle("notifyAssessmentAlerts")}
                      />
                      <Label htmlFor="notifyAssessmentAlerts">Assessment Alerts</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="notifyProctoringAlerts"
                        checked={notificationSettings.notifyProctoringAlerts}
                        onCheckedChange={() => handleSwitchToggle("notifyProctoringAlerts")}
                      />
                      <Label htmlFor="notifyProctoringAlerts">Proctoring Alerts</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="notifySystemUpdates"
                        checked={notificationSettings.notifySystemUpdates}
                        onCheckedChange={() => handleSwitchToggle("notifySystemUpdates")}
                      />
                      <Label htmlFor="notifySystemUpdates">System Updates</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="desktopNotifications"
                        checked={notificationSettings.desktopNotifications}
                        onCheckedChange={() => handleSwitchToggle("desktopNotifications")}
                      />
                      <Label htmlFor="desktopNotifications">Desktop Notifications</Label>
                    </div>
                  </div>
                </div>

                <Button 
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={saveNotificationSettings}
                  disabled={isNotificationSaving}
                >
                  {isNotificationSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Bell className="mr-2 h-4 w-4" />
                      Save Notification Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes. Are you sure you want to leave this tab?
                Your changes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelNavigation}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmNavigation} className="bg-red-500 hover:bg-red-600">
                Discard Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Success Dialog */}
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Settings Saved</AlertDialogTitle>
              <AlertDialogDescription>
                {successMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={stayOnSettingsPage}>
                Stay on Settings
              </AlertDialogCancel>
              <AlertDialogAction onClick={goToDashboard} className="bg-sky-600 hover:bg-sky-700">
                Go to Dashboard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default Settings;
