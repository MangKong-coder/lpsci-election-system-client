// ANCHOR React
import * as React from 'react';

// ANCHOR Next
import Document, {
  DocumentContext, Head, Main, NextScript,
} from 'next/document';

// ANCHOR Styletron
import { Client, Sheet } from 'styletron-engine-atomic';

// ANCHOR Utils
import { styletron } from '../utils/styletron';

function getStylesheets() {
  if (styletron instanceof Client) {
    return [];
  }
  return styletron.getStylesheets();
}

interface IElectionDocumentProps extends DocumentContext {
  stylesheets?: Sheet[];
}


class ElectionDocument extends Document<IElectionDocumentProps> {
  public static async getInitialProps(ctx: IElectionDocumentProps) {
    const initialProps = await Document.getInitialProps(ctx);
    const stylesheets = getStylesheets() || [];
    return { stylesheets, ...initialProps };
  }

  public render() {
    const { stylesheets } = this.props;

    return (
      <html lang="en">
        <Head>
          {
            stylesheets && stylesheets.map((sheet: Sheet, i: number) => (
              <style
                className="_styletron_hydrate_"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: sheet.css }}
                media={sheet.attrs.media}
                data-hydrate={sheet.attrs['data-hydrate']}
                key={i}
              />
            ))
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

// eslint-disable-next-line import/no-default-export
export default ElectionDocument;
