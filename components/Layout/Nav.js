import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';

const Nav = () => (
  <Box as="nav">
    <Breadcrumb textAlign="center" separator="-">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink paddingLeft={1} href="/about">
          About
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  </Box>
);

export default Nav;
