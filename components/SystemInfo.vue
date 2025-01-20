<template>
  <div class="system-info">
    <h2 class="system-info__title">Informations Système</h2>
    
    <div class="system-info__grid">
      <!-- Device Group -->
      <div class="info-group info-group--device">
        <h3 class="info-group__title">Appareil</h3>
        <div class="info-group__content">
          <div class="info-item" v-for="key in deviceKeys" :key="key">
            <span class="info-item__label">{{ formatLabel(key) }}:</span>
            <span class="info-item__value">{{ systemInfo[key] }}</span>
          </div>
        </div>
      </div>

      <!-- Browser Group -->
      <div class="info-group info-group--browser">
        <h3 class="info-group__title">Navigateur</h3>
        <div class="info-group__content">
          <div class="info-item" v-for="key in browserKeys" :key="key">
            <span class="info-item__label">{{ formatLabel(key) }}:</span>
            <span class="info-item__value">{{ systemInfo[key] }}</span>
          </div>
        </div>
      </div>

      <!-- Network Group -->
      <div class="info-group info-group--network">
        <h3 class="info-group__title">Réseau</h3>
        <div class="info-group__content">
          <div class="info-item" v-for="key in networkKeys" :key="key">
            <span class="info-item__label">{{ formatLabel(key) }}:</span>
            <span class="info-item__value">{{ systemInfo[key] }}</span>
          </div>
        </div>
      </div>

      <!-- Location Group -->
      <div class="info-group info-group--location">
        <h3 class="info-group__title">Localisation</h3>
        <div class="info-group__content">
          <div class="info-item" v-for="key in locationKeys" :key="key">
            <span class="info-item__label">{{ formatLabel(key) }}:</span>
            <span class="info-item__value">{{ systemInfo[key] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SystemInfo {
  browser: string;
  browserVersion: string;
  os: string;
  screenResolution: string;
  timezone: string;
  language: string;
  userAgent: string;
  deviceMemory: string;
  cpuCores: number;
  deviceType: string;
  timestamp: string;
  isOnline: boolean;
  connectionType: string;
  batteryLevel: string;
  batteryCharging: boolean;
  colorScheme: string;
  touchScreen: boolean;
  cookiesEnabled: boolean;
  platform: string;
  maxTouchPoints: number;
  doNotTrack: string;
  vendor: string;
  ipAddress: string;
  isp: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  networkSpeed: string;
  webRTCSupported: boolean;
}

const systemInfo = ref<SystemInfo>({} as SystemInfo)

const getBrowserInfo = (): { browser: string; version: string } => {
  const userAgent = navigator.userAgent
  let browser = 'Unknown'
  let version = 'Unknown'

  if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox'
    version = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || ''
  } else if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome'
    version = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || ''
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari'
    version = userAgent.match(/Version\/([0-9.]+)/)?.[1] || ''
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Edge'
    version = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || ''
  }

  return { browser, version }
}

const getOperatingSystem = (): string => {
  const userAgent = navigator.userAgent
  if (userAgent.indexOf('Win') !== -1) return 'Windows'
  if (userAgent.indexOf('Mac') !== -1) return 'MacOS'
  if (userAgent.indexOf('Linux') !== -1) return 'Linux'
  if (userAgent.indexOf('Android') !== -1) return 'Android'
  if (userAgent.indexOf('iOS') !== -1) return 'iOS'
  return 'Unknown'
}

const getDeviceType = (): string => {
  const userAgent = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'Tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return 'Mobile'
  }
  return 'Desktop'
}

const getConnectionInfo = (): string => {
  const connection = (navigator as any).connection;
  return connection ? connection.effectiveType : 'Unknown';
}

const getBatteryInfo = async () => {
  try {
    const battery: any = await (navigator as any).getBattery?.();
    return {
      level: battery ? `${Math.floor(battery.level * 100)}%` : 'Unknown',
      charging: battery ? battery.charging : 'Unknown'
    };
  } catch {
    return { level: 'Not available', charging: 'Unknown' };
  }
}

const getNetworkSpeed = (): string => {
  const connection = (navigator as any).connection;
  if (!connection) return 'Unknown';
  return `${connection.downlink}Mbps`;
}

const getNetworkInfo = async () => {
  try {
    // Utilisation d'ipapi.co (gratuit jusqu'à 1000 requêtes/jour)
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ipAddress: data.ip,
      isp: data.org,
      city: data.city,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude
    };
  } catch {
    return {
      ipAddress: 'Not available',
      isp: 'Unknown',
      city: 'Unknown',
      country: 'Unknown',
      latitude: 'Unknown',
      longitude: 'Unknown'
    };
  }
}

// Groupes d'informations
const deviceKeys = ['os', 'deviceType', 'platform', 'deviceMemory', 'cpuCores', 'touchScreen', 'maxTouchPoints'];
const browserKeys = ['browser', 'browserVersion', 'language', 'cookiesEnabled', 'doNotTrack', 'vendor'];
const networkKeys = ['isOnline', 'connectionType', 'networkSpeed', 'webRTCSupported'];
const locationKeys = ['ipAddress', 'isp', 'city', 'country', 'latitude', 'longitude'];

// Formater les labels pour l'affichage
const formatLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

onMounted(async () => {
  const browserInfo = getBrowserInfo();
  const batteryInfo = await getBatteryInfo();
  const networkInfo = await getNetworkInfo();
  
  systemInfo.value = {
    browser: browserInfo.browser,
    browserVersion: browserInfo.version,
    os: getOperatingSystem(),
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    userAgent: navigator.userAgent,
    deviceMemory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : 'Unknown',
    cpuCores: navigator.hardwareConcurrency || 0,
    deviceType: getDeviceType(),
    timestamp: new Date().toLocaleString(),
    isOnline: navigator.onLine,
    connectionType: getConnectionInfo(),
    batteryLevel: batteryInfo.level,
    batteryCharging: batteryInfo.charging,
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light',
    touchScreen: 'ontouchstart' in window,
    cookiesEnabled: navigator.cookieEnabled,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints,
    doNotTrack: navigator.doNotTrack || 'Not set',
    vendor: navigator.vendor || 'Unknown',
    ipAddress: networkInfo.ipAddress,
    isp: networkInfo.isp,
    city: networkInfo.city,
    country: networkInfo.country,
    latitude: networkInfo.latitude,
    longitude: networkInfo.longitude,
    networkSpeed: getNetworkSpeed(),
    webRTCSupported: !!window.RTCPeerConnection,
  }

  // Ajout des event listeners pour les changements d'état
  window.addEventListener('online', () => systemInfo.value.isOnline = true);
  window.addEventListener('offline', () => systemInfo.value.isOnline = false);

  // Ajouter un écouteur pour les changements de vitesse réseau
  if ((navigator as any).connection) {
    (navigator as any).connection.addEventListener('change', () => {
      systemInfo.value.networkSpeed = getNetworkSpeed();
    });
  }
})

// Nettoyage des écouteurs d'événements
onUnmounted(() => {
  if ((navigator as any).connection) {
    (navigator as any).connection.removeEventListener('change', () => {});
  }
})
</script>

<style lang="scss" scoped>
// Variables
$primary-color: #2c3e50;
$secondary-color: #34495e;
$accent-color: #3498db;
$border-radius: 8px;
$spacing-unit: 1rem;
$transition-duration: 0.3s;

// Mixins
@mixin card-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow $transition-duration ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

.system-info {
  padding: $spacing-unit * 2;
  max-width: 1200px;
  margin: 0 auto;

  &__title {
    color: $primary-color;
    font-size: 2rem;
    margin-bottom: $spacing-unit * 2;
    text-align: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-unit * 2;
  }
}

.info-group {
  @include card-shadow;
  background: white;
  border-radius: $border-radius;
  overflow: hidden;

  &__title {
    background: $secondary-color;
    color: white;
    padding: $spacing-unit;
    margin: 0;
    font-size: 1.2rem;
  }

  &__content {
    padding: $spacing-unit;
  }

  // Variants
  &--device { border-top: 3px solid #e74c3c; }
  &--browser { border-top: 3px solid #2ecc71; }
  &--network { border-top: 3px solid #f1c40f; }
  &--location { border-top: 3px solid #9b59b6; }
}

.info-item {
  padding: ($spacing-unit / 2) 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }

  &__label {
    color: $primary-color;
    font-weight: 600;
    margin-right: $spacing-unit / 2;
  }

  &__value {
    color: $secondary-color;
  }

  // État en ligne/hors ligne
  &--online .info-item__value {
    color: #2ecc71;
  }

  &--offline .info-item__value {
    color: #e74c3c;
  }
}

// Media queries pour la responsivité
@media (max-width: 768px) {
  .system-info {
    padding: $spacing-unit;

    &__grid {
      gap: $spacing-unit;
    }
  }

  .info-group {
    margin-bottom: $spacing-unit;
  }
}
</style>