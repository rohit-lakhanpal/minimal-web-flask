param location string = resourceGroup().location
param unique string = 'minimal-web-flask-${uniqueString(resourceGroup().id)}'
param appName string = '${unique}-app'
param aspName string = '${unique}-asp'
param pythonVersion string = '3.12'
param startupCommand string = 'gunicorn --bind=0.0.0.0 --timeout 600 main:app'
param environment string

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: aspName
  location: location
  kind: 'linux'
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  tags: {
    'azd-service-name': 'web'
    'environment': environment
    'project': 'minimal-web-flask'
  }  
  properties: {
    reserved: true
  }
}

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'PYTHON|${pythonVersion}'
      appCommandLine: startupCommand
      alwaysOn: true
      httpLoggingEnabled: true
      detailedErrorLoggingEnabled: true
    }
  }
  tags: {
    'azd-service-name': 'web'
    'environment': environment
    'project': 'minimal-web-flask'
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${appName}-appinsights'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
  }
  tags: {
    'environment': environment
    'project': 'minimal-web-flask'
  }
}

output appInsightsInstrumentationKey string = appInsights.properties.InstrumentationKey
