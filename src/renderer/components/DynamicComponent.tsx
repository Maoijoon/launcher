import { Suspense, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { DynamicComponentContext } from './DynamicComponentProvider';

type DynamicComponentProps = {
  name: string;
  props: any;
}

export function DynamicComponent({ name, props }: DynamicComponentProps) {
  const { getComponent } = useContext(DynamicComponentContext);

  const Component = getComponent(name);
  return (
    <ErrorBoundary fallbackRender={({ error }) => <div>{`Error rendering dynamic component '${name}': ${error}`}</div>}>
      <Suspense>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
