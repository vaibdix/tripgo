import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import your translation files
const resources = {
  english: {
    translation: {
      settings: {
        title: 'Settings',
        appearance: {
          title: 'Appearance',
          description: 'Customize how the dashboard looks and feels',
          themeMode: 'Theme Mode',
          darkModeEnabled: 'Dark mode is enabled',
          lightModeEnabled: 'Light mode is enabled',
          darkMode: 'Dark Mode',
          lightMode: 'Light Mode',
        },
        themePreview: {
          title: 'Theme Preview',
          description: 'See how your dashboard will look with the selected theme',
          sampleCard: 'Sample Card',
          cardDescription: 'This is how cards will appear in',
          darkMode: 'dark',
          lightMode: 'light',
          accentButton: 'Accent Color Button',
        },
        dataPerformance: {
          title: 'Data & Performance',
          description: 'Configure how data is loaded and displayed',
          refreshRate: 'Data Refresh Rate',
          refreshDescription: 'How often data should automatically refresh',
          compactView: 'Compact View',
          compactDescription: 'Show more data in less space',
          enabled: 'Enabled',
          disabled: 'Disabled',
        },
        notifications: {
          title: 'Notifications',
          description: 'Manage how you receive notifications',
          dashboard: 'Dashboard Notifications',
          dashboardDescription: 'Receive notifications about new bookings and updates',
        },
        language: {
          title: 'Language & Region',
          dashboard: 'Dashboard Language',
          autoSave: 'Auto-Save Interval (minutes)',
        },
        saveButton: 'Save All Settings',
        saveSuccess: 'Settings saved! Language set to:',
      },
    },
  },
  hindi: {
    translation: {
      settings: {
        title: 'सेटिंग्स',
        appearance: {
          title: 'दिखावट',
          description: 'डैशबोर्ड कैसा दिखता है और महसूस होता है, इसे अनुकूलित करें',
          themeMode: 'थीम मोड',
          darkModeEnabled: 'डार्क मोड सक्षम है',
          lightModeEnabled: 'लाइट मोड सक्षम है',
          darkMode: 'डार्क मोड',
          lightMode: 'लाइट मोड',
        },
        themePreview: {
          title: 'थीम पूर्वावलोकन',
          description: 'देखें कि चयनित थीम के साथ आपका डैशबोर्ड कैसा दिखेगा',
          sampleCard: 'नमूना कार्ड',
          cardDescription: 'कार्ड इस प्रकार दिखाई देंगे',
          darkMode: 'डार्क',
          lightMode: 'लाइट',
          accentButton: 'एक्सेंट कलर बटन',
        },
        dataPerformance: {
          title: 'डेटा और प्रदर्शन',
          description: 'कॉन्फ़िगर करें कि डेटा कैसे लोड और प्रदर्शित किया जाता है',
          refreshRate: 'डेटा रिफ्रेश दर',
          refreshDescription: 'डेटा कितनी बार स्वचालित रूप से रिफ्रेश होना चाहिए',
          compactView: 'कॉम्पैक्ट व्यू',
          compactDescription: 'कम जगह में अधिक डेटा दिखाएं',
          enabled: 'सक्षम',
          disabled: 'अक्षम',
        },
        notifications: {
          title: 'सूचनाएं',
          description: 'प्रबंधित करें कि आप सूचनाएं कैसे प्राप्त करते हैं',
          dashboard: 'डैशबोर्ड सूचनाएं',
          dashboardDescription: 'नई बुकिंग और अपडेट के बारे में सूचनाएं प्राप्त करें',
        },
        language: {
          title: 'भाषा और क्षेत्र',
          dashboard: 'डैशबोर्ड भाषा',
          autoSave: 'ऑटो-सेव अंतराल (मिनट)',
        },
        saveButton: 'सभी सेटिंग्स सहेजें',
        saveSuccess: 'सेटिंग्स सहेजी गईं! भाषा सेट की गई:',
      },
    },
  },
  spanish: {
    translation: {
      settings: {
        title: 'Configuración',
        appearance: {
          title: 'Apariencia',
          description: 'Personaliza cómo se ve y se siente el panel',
          themeMode: 'Modo de tema',
          darkModeEnabled: 'El modo oscuro está habilitado',
          lightModeEnabled: 'El modo claro está habilitado',
          darkMode: 'Modo oscuro',
          lightMode: 'Modo claro',
        },
        themePreview: {
          title: 'Vista previa del tema',
          description: 'Vea cómo se verá su panel con el tema seleccionado',
          sampleCard: 'Tarjeta de muestra',
          cardDescription: 'Así es como aparecerán las tarjetas en modo',
          darkMode: 'oscuro',
          lightMode: 'claro',
          accentButton: 'Botón de color de acento',
        },
        dataPerformance: {
          title: 'Datos y rendimiento',
          description: 'Configure cómo se cargan y muestran los datos',
          refreshRate: 'Tasa de actualización de datos',
          refreshDescription: 'Con qué frecuencia deben actualizarse automáticamente los datos',
          compactView: 'Vista compacta',
          compactDescription: 'Mostrar más datos en menos espacio',
          enabled: 'Habilitado',
          disabled: 'Deshabilitado',
        },
        notifications: {
          title: 'Notificaciones',
          description: 'Administre cómo recibe notificaciones',
          dashboard: 'Notificaciones del panel',
          dashboardDescription: 'Reciba notificaciones sobre nuevas reservas y actualizaciones',
        },
        language: {
          title: 'Idioma y región',
          dashboard: 'Idioma del panel',
          autoSave: 'Intervalo de autoguardado (minutos)',
        },
        saveButton: 'Guardar todos los ajustes',
        saveSuccess: 'Configuración guardada! Idioma establecido en:',
      },
    },
  },
  french: {
    translation: {
      settings: {
        title: 'Paramètres',
        appearance: {
          title: 'Apparence',
          description: "Personnalisez l'apparence du tableau de bord",
          themeMode: 'Mode de thème',
          darkModeEnabled: 'Le mode sombre est activé',
          lightModeEnabled: 'Le mode clair est activé',
          darkMode: 'Mode sombre',
          lightMode: 'Mode clair',
        },
        themePreview: {
          title: 'Aperçu du thème',
          description: 'Voyez à quoi ressemblera votre tableau de bord avec le thème sélectionné',
          sampleCard: 'Carte exemple',
          cardDescription: 'Voici comment les cartes apparaîtront en mode',
          darkMode: 'sombre',
          lightMode: 'clair',
          accentButton: "Bouton de couleur d'accent",
        },
        dataPerformance: {
          title: 'Données et performance',
          description: 'Configurez comment les données sont chargées et affichées',
          refreshRate: 'Taux de rafraîchissement des données',
          refreshDescription:
            'À quelle fréquence les données doivent se rafraîchir automatiquement',
          compactView: 'Vue compacte',
          compactDescription: "Afficher plus de données dans moins d'espace",
          enabled: 'Activé',
          disabled: 'Désactivé',
        },
        notifications: {
          title: 'Notifications',
          description: 'Gérez comment vous recevez les notifications',
          dashboard: 'Notifications du tableau de bord',
          dashboardDescription:
            'Recevez des notifications sur les nouvelles réservations et mises à jour',
        },
        language: {
          title: 'Langue et région',
          dashboard: 'Langue du tableau de bord',
          autoSave: "Intervalle d'enregistrement automatique (minutes)",
        },
        saveButton: 'Enregistrer tous les paramètres',
        saveSuccess: 'Paramètres enregistrés! Langue définie sur:',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'english',
    fallbackLng: 'english',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
