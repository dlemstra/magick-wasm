# Copyright 2019 Dirk Lemstra <https://github.com/dlemstra/Magick.WASM/>
#
# Licensed under the ImageMagick License (the "License"); you may not use this file except in
# compliance with the License. You may obtain a copy of the License at
#
#   https://www.imagemagick.org/script/license.php
#
# Unless required by applicable law or agreed to in writing, software distributed under the
# License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
# either express or implied. See the License for the specific language governing permissions
# and limitations under the License.

function installPackage($version, $target) {
    Remove-Item $target -Recurse -ErrorAction Ignore
    [void](New-Item -ItemType directory -Path $target)

    $temp = "$PSScriptRoot\temp"
    Remove-Item $temp -Recurse -ErrorAction Ignore
    [void](New-Item -ItemType directory -Path $temp)

    # Temporary download from DropBox
    $url = "https://dl.dropboxusercontent.com/s/s9j2smr5wl8uerp/magick.native-$version.tgz"
    Invoke-WebRequest $url -Outfile "$temp\magick.native-$version.tgz"

    cd $PSScriptRoot
    npm install $temp\magick.native-$version.tgz
}

function copyToProject() {
    $source = "$PSScriptRoot\node_modules\magick.native\wasm\magick-Q8.js"
    $target = "$PSScriptRoot\..\wasm\magick.js"
    Copy-Item "$source" "$target"
}

$version = [IO.File]::ReadAllText("$PSScriptRoot\magick-native.version").Trim()
$folder = "$PSScriptRoot\temp"

installPackage $version $folder
copyToProject
Remove-Item $folder -Recurse -ErrorAction Ignore
