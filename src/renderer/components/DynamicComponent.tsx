import { useContext } from 'react';
import { DynamicComponentContext } from './DynamicComponentProvider';
import { ErrorBoundary } from 'react-error-boundary';

type DynamicComponentProps = {
  name: string;
  props: any;
}

export function DynamicComponent({ name, props }: DynamicComponentProps) {
  const { components, loading } = useContext(DynamicComponentContext);

  const Component = components[name];
  if (Component) {
    return (
      <ErrorBoundary fallbackRender={({ error }) => <div>{`Error rendering dynamic component '${name}': ${error}`}</div>}>
        <Component {...props}/>
      </ErrorBoundary>
    );
  }

  if (loading) {
    return <div>Loading dynamic components...</div>;
  } else {
    return <div>Dynamic component '{name}' not found</div>;
  }
}
