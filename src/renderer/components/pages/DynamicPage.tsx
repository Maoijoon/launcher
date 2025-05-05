import { DynamicComponent } from '../DynamicComponent';

export type DynamicPageProps = {
  name: string;
  props: any;
}

export function DynamicPage(props: DynamicPageProps) {
  if (props.name) {
    return <DynamicComponent name={props.name} props={props.props}/>;
  } else {
    return <div>No Dynamic Component Loaded</div>;
  }
}
