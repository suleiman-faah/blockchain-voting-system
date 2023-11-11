import { forwardRef } from 'react';
import NextLink from 'next/link';

const Link = forwardRef((props, ref) => <NextLink ref={ref} {...props} />);

export default Link;
