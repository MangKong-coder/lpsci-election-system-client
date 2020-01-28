// ANCHOR React
import * as React from 'react';
import { ElectionPage } from '@lpsci/components/ElectionPage';
import { GlobalProvider } from '@lpsci/components/GlobalProvider';
import { ElectionAppHead } from '@lpsci/components/head/ElectionAppHead/ElectionAppHead';
// ANCHOR Base
import { H1 } from 'baseui/typography';

// eslint-disable-next-line import/no-default-export
export default React.memo(() => (
  <GlobalProvider>
    <ElectionAppHead title="SSG Election" description="Election Web App" />
    <ElectionPage>
      <H1>
        Hello World!
      </H1>
    </ElectionPage>
  </GlobalProvider>
));
