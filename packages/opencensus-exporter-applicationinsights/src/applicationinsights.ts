/**
 * Copyright 2018, OpenCensus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Exporter, ExporterConfig, RootSpan} from '@opencensus/core';
import {TelemetryClient} from 'applicationinsights';

/**
 * Options for Application Insights configuration
 */
export interface ApplicationInsightsExporterOptions extends ExporterConfig {
  /**
   * Telemetry client instance provided by the Application Insights SDK.
   */
  client: TelemetryClient;
}

/** Format and sends span information to Application Insights */
export class ApplicationInsightsTraceExporter implements Exporter {
  private client: TelemetryClient;

  constructor(options: ApplicationInsightsExporterOptions) {
    this.client = options.client;
  }

  /**
   * Is called whenever a span is ended.
   * @param root the ended span
   */
  onEndSpan(root: RootSpan) {
    this.publish([root]);
  }

  /** Not used for this exporter */
  onStartSpan(root: RootSpan) {}

  /**
   * Publishes a list of root spans to ApplicationInsights.
   * @param rootSpans
   * @returns Promise<void>
   */
  publish(rootSpans: RootSpan[]): Promise<void> {
    return new Promise((resolve, reject) => {
      rootSpans.forEach(x => this.client.trackTrace({"message": JSON.stringify(x)}));
      resolve();
    });
  }
}