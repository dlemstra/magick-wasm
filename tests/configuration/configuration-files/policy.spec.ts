// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ConfigurationFiles } from '@src/configuration/configuration-files';

describe('ConfigurationFiles#policy', () => {
    it('should contain the correct content', () => {
        const configurationFiles = ConfigurationFiles.default;

        expect(configurationFiles.policy.data).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE policymap [
<!ELEMENT policymap (policy)*>
<!ATTLIST policymap xmlns CDATA #FIXED "">
<!ELEMENT policy EMPTY>
<!ATTLIST policy xmlns CDATA #FIXED "">
<!ATTLIST policy domain NMTOKEN #REQUIRED>
<!ATTLIST policy name NMTOKEN #IMPLIED>
<!ATTLIST policy pattern CDATA #IMPLIED>
<!ATTLIST policy rights NMTOKEN #IMPLIED>
<!ATTLIST policy stealth NMTOKEN #IMPLIED>
<!ATTLIST policy value CDATA #IMPLIED>
]>
<policymap>
  <policy domain="cache" name="shared-secret" value="passphrase"/>
  <policy domain="coder" rights="none" pattern="EPHEMERAL" />
  <policy domain="coder" rights="none" pattern="MVG" />
  <policy domain="coder" rights="none" pattern="MSL" />
  <policy domain="path" rights="none" pattern="@*" />
  <policy domain="path" rights="none" pattern="|*" />
</policymap>
`);
    });
});
