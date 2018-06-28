# OpenCensus Application Insights Exporter for Node.js
[![Gitter chat][gitter-image]][gitter-url]

OpenCensus Application Insights Exporter allows the user to send collected traces with [OpenCensus Node.js](https://github.com/census-instrumentation/opencensus-node) to Application Insights.

This project is still at an early stage of development. It's subject to change.

## Installation

Install OpenCensus Application Insights Exporter with:
```bash
npm install @opencensus/nodejs
npm install @opencensus/exporter-applicationinsights
```

## Usage

Instance the exporter on your application and pass a TelemetryClient instance to it. For javascript:

```javascript
const tracing = require('@opencensus/nodejs');
const aiExporter = require('@opencensus/exporter-applicationinsights');
const appInsights = require('applicationinsights');

// Add your telemetry client instance to the exporter options
const exporter = new aiExporter.ApplicationInsightsTraceExporter({client: new appInsights.TelemetryClient("<your ikey here>")});

tracing.registerExporter(exporter).start();
```

Similarly for Typescript:

```typescript
import * as tracing from '@opencensus/nodejs';
import { TelemetryClient } from 'applicationinsights';
import { ApplicationInsightsTraceExporter } from '@opencensus/exporter-applicationinsights';

// Add your project id to the Stackdriver options
const exporter = new ApplicationInsightsTraceExporter({client: new TelemetryClient("<your ikey here>")});
```

Now, register the exporter and start tracing.

```javascript
tracing.start({'exporter': exporter});
```

or

```javascript
tracing.registerExporter(exporter).start();
```

## Useful links
- To learn more about Application Insights visit: <https://azure.microsoft.com/documentation/articles/app-insights-overview/>
- To learn more about the Application Insights SDK for NodeJS visit: <https://github.com/Microsoft/ApplicationInsights-node.js>
- For more information on OpenCensus visit: <https://opencensus.io/>
- To checkout the OpenCensus for Node.js visit: <https://github.com/census-instrumentation/opencensus-node>
- For help or feedback on this project join us on [gitter](https://gitter.im/census-instrumentation/Lobby)

[gitter-image]: https://badges.gitter.im/census-instrumentation/lobby.svg
[gitter-url]: https://gitter.im/census-instrumentation/lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
