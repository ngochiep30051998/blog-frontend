declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?react' {
  import React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '@cms/assets/svgs/*' {
  const content: string;
  export default content;
}

declare module '@cms/assets/images/*' {
  const content: string;
  export default content;
}