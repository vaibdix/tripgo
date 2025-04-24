// Rename the import to avoid conflict
import { useTheme as useCustomTheme } from './ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsAdmin = () => {
  const { darkMode, toggleDarkMode, accentColor, setAccentColor } = useCustomTheme();
  const [selectedColor, setSelectedColor] = useState(accentColor);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(5);
  const [language, setLanguage] = useState('english');
  const [dataRefreshRate, setDataRefreshRate] = useState(30);
  const [compactView, setCompactView] = useState(false);
  const { t, i18n } = useTranslation();

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    console.log(`Language changed to ${lang}`);
  };

  const handleSaveSettings = () => {
    setAccentColor(selectedColor);
    console.log('Saving settings:', {
      darkMode,
      accentColor: selectedColor,
      notificationsEnabled,
      autoSaveInterval,
      language,
      dataRefreshRate,
      compactView,
    });

    alert(`${t('settings.saveSuccess')} ${language}`);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        {t('settings.title')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              mb: 3,
              bgcolor: darkMode ? '#1e1e1e' : '#fff',
              color: darkMode ? '#fff' : 'inherit',
            }}
          >
            <Box sx={{ p: 3, bgcolor: darkMode ? '#333' : '#f8f8f8' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t('settings.appearance.title')}
              </Typography>
              <Typography
                variant="body2"
                color={darkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
              >
                {t('settings.appearance.description')}
              </Typography>
            </Box>
            <Divider
              sx={{
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}
            />
            <Box sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: darkMode ? '#555' : '#f0f0f0',
                        color: darkMode ? '#fff' : '#666',
                        mr: 2,
                      }}
                    >
                      {darkMode ? <DarkMode /> : <LightMode />}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {t('settings.appearance.themeMode')}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={darkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
                      >
                        {darkMode
                          ? t('settings.appearance.darkModeEnabled')
                          : t('settings.appearance.lightModeEnabled')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <FormControlLabel
                      control={
                        <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />
                      }
                      label={
                        darkMode
                          ? t('settings.appearance.darkMode')
                          : t('settings.appearance.lightMode')
                      }
                    />
                  </Box>
                </Grid>

                {/* Add Accent Color Selector */}
                <Grid item xs={12}>
                  <Divider
                    sx={{
                      my: 2,
                      borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: selectedColor,
                        color: '#fff',
                        mr: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: '#fff',
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Accent Color
                      </Typography>
                      <Typography
                        variant="body2"
                        color={darkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
                      >
                        Choose your preferred accent color
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    {[
                      '#7C3AED', // Purple (Default)
                      '#3B82F6', // Blue
                      '#10B981', // Green
                      '#F59E0B', // Amber
                      '#EF4444', // Red
                      '#EC4899', // Pink
                      '#8B5CF6', // Violet
                      '#06B6D4', // Cyan
                    ].map((color) => (
                      <Box
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          bgcolor: color,
                          cursor: 'pointer',
                          border: selectedColor === color ? '2px solid white' : 'none',
                          boxShadow:
                            selectedColor === color
                              ? `0 0 0 2px ${color}, 0 0 0 4px rgba(255,255,255,0.5)`
                              : 'none',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Theme Preview section */}
          <Paper
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: darkMode ? '#1e1e1e' : '#fff',
              color: darkMode ? '#fff' : 'inherit',
            }}
          >
            <Box sx={{ p: 3, bgcolor: darkMode ? '#333' : '#f8f8f8' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t('settings.themePreview.title')}
              </Typography>
              <Typography
                variant="body2"
                color={darkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
              >
                {t('settings.themePreview.description')}
              </Typography>
            </Box>
            <Divider
              sx={{
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}
            />
            <Box sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      bgcolor: darkMode ? '#333' : '#fff',
                      color: darkMode ? '#fff' : 'inherit',
                      transition: 'all 0.3s ease',
                      boxShadow: darkMode
                        ? '0 4px 8px rgba(0,0,0,0.4)'
                        : '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: darkMode ? '#fff' : '#333' }}>
                        {t('settings.themePreview.sampleCard')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: darkMode ? '#ccc' : '#666' }}>
                        {t('settings.themePreview.cardDescription')}{' '}
                        {darkMode
                          ? t('settings.themePreview.darkMode')
                          : t('settings.themePreview.lightMode')}{' '}
                        mode
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          mt: 2,
                          bgcolor: selectedColor,
                          '&:hover': {
                            bgcolor: selectedColor,
                            filter: 'brightness(0.9)',
                          },
                        }}
                      >
                        {t('settings.themePreview.accentButton')}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Data & Performance section */}
          <Paper
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              mb: 3,
              bgcolor: darkMode ? '#1e1e1e' : '#fff',
              color: darkMode ? '#fff' : 'inherit',
            }}
          >
            <Box sx={{ p: 3, bgcolor: darkMode ? '#333' : '#f8f8f8' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t('settings.dataPerformance.title')}
              </Typography>
              <Typography
                variant="body2"
                color={darkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
              >
                {t('settings.dataPerformance.description')}
              </Typography>
            </Box>
            <Divider
              sx={{
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}
            />
            <Box sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {t('settings.dataPerformance.refreshRate')}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={darkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
                    >
                      {t('settings.dataPerformance.refreshDescription')}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: 200 }}>
                      <Button
                        variant={dataRefreshRate === 15 ? 'contained' : 'outlined'}
                        size="small"
                        sx={{
                          mr: 1,
                          bgcolor: dataRefreshRate === 15 ? selectedColor : 'transparent',
                          borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                          color: dataRefreshRate === 15 ? '#fff' : darkMode ? '#fff' : 'inherit',
                          '&:hover': {
                            bgcolor: dataRefreshRate === 15 ? selectedColor : 'transparent',
                            filter: dataRefreshRate === 15 ? 'brightness(0.9)' : 'none',
                          },
                        }}
                        onClick={() => setDataRefreshRate(15)}
                      >
                        15s
                      </Button>
                      <Button
                        variant={dataRefreshRate === 30 ? 'contained' : 'outlined'}
                        size="small"
                        sx={{
                          mr: 1,
                          bgcolor: dataRefreshRate === 30 ? selectedColor : 'transparent',
                          borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                          color: dataRefreshRate === 30 ? '#fff' : darkMode ? '#fff' : 'inherit',
                          '&:hover': {
                            bgcolor: dataRefreshRate === 30 ? selectedColor : 'transparent',
                            filter: dataRefreshRate === 30 ? 'brightness(0.9)' : 'none',
                          },
                        }}
                        onClick={() => setDataRefreshRate(30)}
                      >
                        30s
                      </Button>
                      <Button
                        variant={dataRefreshRate === 60 ? 'contained' : 'outlined'}
                        size="small"
                        sx={{
                          bgcolor: dataRefreshRate === 60 ? selectedColor : 'transparent',
                          borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                          color: dataRefreshRate === 60 ? '#fff' : darkMode ? '#fff' : 'inherit',
                          '&:hover': {
                            bgcolor: dataRefreshRate === 60 ? selectedColor : 'transparent',
                            filter: dataRefreshRate === 60 ? 'brightness(0.9)' : 'none',
                          },
                        }}
                        onClick={() => setDataRefreshRate(60)}
                      >
                        60s
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider
                    sx={{
                      my: 2,
                      borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {t('settings.dataPerformance.compactView')}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={darkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
                    >
                      Show more data in less space
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={compactView}
                          onChange={(e) => setCompactView(e.target.checked)}
                          color="primary"
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: selectedColor,
                              '&:hover': {
                                backgroundColor: 'rgba(124, 58, 237, 0.08)',
                              },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: selectedColor,
                            },
                          }}
                        />
                      }
                      label={compactView ? 'Enabled' : 'Disabled'}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              borderRadius: 2,
              p: 3,
              mt: 3,
              bgcolor: darkMode ? '#1e1e1e' : '#fff',
              color: darkMode ? '#fff' : 'inherit',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {t('settings.language.title')}
            </Typography>
            <Divider
              sx={{
                mb: 2,
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}
            />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t('settings.language.dashboard')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['english', 'hindi', 'spanish', 'french'].map((lang) => (
                  <Button
                    key={lang}
                    variant={language === lang ? 'contained' : 'outlined'}
                    size="small"
                    sx={{
                      textTransform: 'capitalize',
                      bgcolor: language === lang ? selectedColor : 'transparent',
                      color: language === lang ? '#fff' : darkMode ? '#fff' : 'inherit',
                      borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                      '&:hover': {
                        bgcolor: language === lang ? selectedColor : 'transparent',
                        filter: language === lang ? 'brightness(0.9)' : 'none',
                      },
                    }}
                    onClick={() => handleLanguageChange(lang)}
                  >
                    {lang}
                  </Button>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSaveSettings}
          sx={{
            bgcolor: selectedColor,
            '&:hover': {
              bgcolor: selectedColor,
              filter: 'brightness(0.9)',
            },
            px: 4,
            py: 1,
          }}
        >
          {t('settings.saveButton')}
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsAdmin;
