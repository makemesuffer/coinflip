import { LinkHTMLAttributes } from 'react';
import NextLink from 'next/link';

type LinkProps = LinkHTMLAttributes<HTMLAnchorElement> & {
  hrefValue: string;
  primary?: boolean;
};

const Link: React.FC<LinkProps> = ({
  children,
  hrefValue,
  primary = false,
  ...props
}) => (
  <NextLink href={hrefValue}>
    <a
      className={
        primary ? 'link link-primary no-underline' : 'link no-underline'
      }
      {...props}
    >
      {children}
    </a>
  </NextLink>
);

export default Link;
