// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ConfigurationFiles } from '@src/configuration/configuration-files';

describe('ConfigurationFiles#log', () => {
    it('should contain the correct content', () => {
        const configurationFiles = ConfigurationFiles.default;

        expect(configurationFiles.log.data).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE logmap [
<!ELEMENT logmap (log)+>
<!ELEMENT log (#PCDATA)>
<!ATTLIST log events CDATA #IMPLIED>
<!ATTLIST log output CDATA #IMPLIED>
<!ATTLIST log filename CDATA #IMPLIED>
<!ATTLIST log generations CDATA #IMPLIED>
<!ATTLIST log limit CDATA #IMPLIED>
<!ATTLIST log format CDATA #IMPLIED>
]>
<logmap>
  <log events="None"/>
  <log output="Debug"/>
  <log filename="Magick-%g.log"/>
  <log generations="3"/>
  <log limit="2000"/>
  <log format="%t %r %u %v %d %c[%p]: %m/%f/%l/%d
  %e"/>
</logmap>
`);
    });
});
