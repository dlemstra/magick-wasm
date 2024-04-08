// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Specifies the different image formats that are supported by ImageMagick.
 */
export enum MagickFormat {
    /**
     * Unknown.
     */
    Unknown = 'UNKNOWN',

    /**
     * Hasselblad CFV/H3D39II Raw Format.
     */
    ThreeFr = '3FR',

    /**
     * Media Container.
     */
    ThreeG2 = '3G2',

    /**
     * Media Container.
     */
    ThreeGp = '3GP',

    /**
     * Raw alpha samples.
     */
    A = 'A',

    /**
     * AAI Dune image.
     */
    Aai = 'AAI',

    /**
     * Adobe Illustrator CS2.
     */
    Ai = 'AI',

    /**
     * Animated Portable Network Graphics.
     */
    APng = 'APNG',

    /**
     * PFS: 1st Publisher Clip Art.
     */
    Art = 'ART',

    /**
     * Sony Alpha Raw Format.
     */
    Arw = 'ARW',

    /**
     * Image sequence laid out in continuous irregular courses (Unknown).
     */
    Ashlar = 'ASHLAR',

    /**
     * Microsoft Audio/Visual Interleaved.
     */
    Avi = 'AVI',

    /**
     * AV1 Image File Format (Heic).
     */
    Avif = 'AVIF',

    /**
     * AVS X image.
     */
    Avs = 'AVS',

    /**
     * Raw blue samples.
     */
    B = 'B',

    /**
     * Raw mosaiced samples.
     */
    Bayer = 'BAYER',

    /**
     * Raw mosaiced and alpha samples.
     */
    Bayera = 'BAYERA',

    /**
     * Raw blue, green, and red samples.
     */
    Bgr = 'BGR',

    /**
     * Raw blue, green, red, and alpha samples.
     */
    Bgra = 'BGRA',

    /**
     * Raw blue, green, red, and opacity samples.
     */
    Bgro = 'BGRO',

    /**
     * Microsoft Windows bitmap image.
     */
    Bmp = 'BMP',

    /**
     * Microsoft Windows bitmap image (V2).
     */
    Bmp2 = 'BMP2',

    /**
     * Microsoft Windows bitmap image (V3).
     */
    Bmp3 = 'BMP3',

    /**
     * BRF ASCII Braille format.
     */
    Brf = 'BRF',

    /**
     * Raw cyan samples.
     */
    C = 'C',

    /**
     * Continuous Acquisition and Life-cycle Support Type 1.
     */
    Cal = 'CAL',

    /**
     * Continuous Acquisition and Life-cycle Support Type 1.
     */
    Cals = 'CALS',

    /**
     * Constant image uniform color.
     */
    Canvas = 'CANVAS',

    /**
     * Caption.
     */
    Caption = 'CAPTION',

    /**
     * Cineon Image File.
     */
    Cin = 'CIN',

    /**
     * Cisco IP phone image format.
     */
    Cip = 'CIP',

    /**
     * Image Clip Mask.
     */
    Clip = 'CLIP',

    /**
     * Raw cyan, magenta, yellow, and black samples.
     */
    Cmyk = 'CMYK',

    /**
     * Raw cyan, magenta, yellow, black, and alpha samples.
     */
    Cmyka = 'CMYKA',

    /**
     * Canon Digital Camera Raw Format.
     */
    Cr2 = 'CR2',

    /**
     * Canon Digital Camera Raw Format.
     */
    Cr3 = 'CR3',

    /**
     * Canon Digital Camera Raw Format.
     */
    Crw = 'CRW',

    /**
     * Cube color lookup table image.
     */
    Cube = 'CUBE',

    /**
     * Microsoft icon.
     */
    Cur = 'CUR',

    /**
     * DR Halo.
     */
    Cut = 'CUT',

    /**
     * Base64-encoded inline images.
     */
    Data = 'DATA',

    /**
     * Digital Imaging and Communications in Medicine image.
     */
    Dcm = 'DCM',

    /**
     * Kodak Digital Camera Raw Format.
     */
    Dcr = 'DCR',

    /**
     * Raw Photo Decoder (dcraw).
     */
    Dcraw = 'DCRAW',

    /**
     * ZSoft IBM PC multi-page Paintbrush.
     */
    Dcx = 'DCX',

    /**
     * Microsoft DirectDraw Surface.
     */
    Dds = 'DDS',

    /**
     * Multi-face font package.
     */
    Dfont = 'DFONT',

    /**
     * Digital Negative Raw Format.
     */
    Dng = 'DNG',

    /**
     * SMPTE 268M-2003 (DPX 2.0).
     */
    Dpx = 'DPX',

    /**
     * Microsoft DirectDraw Surface.
     */
    Dxt1 = 'DXT1',

    /**
     * Microsoft DirectDraw Surface.
     */
    Dxt5 = 'DXT5',

    /**
     * Encapsulated Portable Document Format.
     */
    Epdf = 'EPDF',

    /**
     * Encapsulated PostScript Interchange format.
     */
    Epi = 'EPI',

    /**
     * Encapsulated PostScript.
     */
    Eps = 'EPS',

    /**
     * Level II Encapsulated PostScript.
     */
    Eps2 = 'EPS2',

    /**
     * Level III Encapsulated PostScript.
     */
    Eps3 = 'EPS3',

    /**
     * Encapsulated PostScript.
     */
    Epsf = 'EPSF',

    /**
     * Encapsulated PostScript Interchange format.
     */
    Epsi = 'EPSI',

    /**
     * Encapsulated PostScript with TIFF preview.
     */
    Ept = 'EPT',

    /**
     * Encapsulated PostScript Level II with TIFF preview.
     */
    Ept2 = 'EPT2',

    /**
     * Encapsulated PostScript Level III with TIFF preview.
     */
    Ept3 = 'EPT3',

    /**
     * Epson Raw Format.
     */
    Erf = 'ERF',

    /**
     * High Dynamic-range (HDR).
     */
    Exr = 'EXR',

    /**
     * Farbfeld.
     */
    Farbfeld = 'FARBFELD',

    /**
     * Group 3 FAX.
     */
    Fax = 'FAX',

    /**
     * Farbfeld.
     */
    Ff = 'FF',

    /**
     * Hasselblad CFV/H3D39II Raw Format.
     */
    Fff = 'FFF',

    /**
     * Uniform Resource Locator (file://).
     */
    File = 'FILE',

    /**
     * Flexible Image Transport System.
     */
    Fits = 'FITS',

    /**
     * FilmLight.
     */
    Fl32 = 'FL32',

    /**
     * Flash Video Stream.
     */
    Flv = 'FLV',

    /**
     * Plasma fractal image.
     */
    Fractal = 'FRACTAL',

    /**
     * Uniform Resource Locator (ftp://).
     */
    Ftp = 'FTP',

    /**
     * Flexible Image Transport System.
     */
    Fts = 'FTS',

    /**
     * Formatted text image.
     */
    Ftxt = 'FTXT',

    /**
     * Raw green samples.
     */
    G = 'G',

    /**
     * Group 3 FAX.
     */
    G3 = 'G3',

    /**
     * Group 4 FAX.
     */
    G4 = 'G4',

    /**
     * CompuServe graphics interchange format.
     */
    Gif = 'GIF',

    /**
     * CompuServe graphics interchange format.
     */
    Gif87 = 'GIF87',

    /**
     * Gradual linear passing from one shade to another.
     */
    Gradient = 'GRADIENT',

    /**
     * Raw gray samples.
     */
    Gray = 'GRAY',

    /**
     * Raw gray and alpha samples.
     */
    Graya = 'GRAYA',

    /**
     * Raw CCITT Group4.
     */
    Group4 = 'GROUP4',

    /**
     * Identity Hald color lookup table image.
     */
    Hald = 'HALD',

    /**
     * Radiance RGBE image format.
     */
    Hdr = 'HDR',

    /**
     * High Efficiency Image Format.
     */
    Heic = 'HEIC',

    /**
     * High Efficiency Image Format.
     */
    Heif = 'HEIF',

    /**
     * Histogram of the image.
     */
    Histogram = 'HISTOGRAM',

    /**
     * Slow Scan TeleVision.
     */
    Hrz = 'HRZ',

    /**
     * Hypertext Markup Language and a client-side image map.
     */
    Htm = 'HTM',

    /**
     * Hypertext Markup Language and a client-side image map.
     */
    Html = 'HTML',

    /**
     * Uniform Resource Locator (http://).
     */
    Http = 'HTTP',

    /**
     * Uniform Resource Locator (https://).
     */
    Https = 'HTTPS',

    /**
     * Truevision Targa image.
     */
    Icb = 'ICB',

    /**
     * Microsoft icon.
     */
    Ico = 'ICO',

    /**
     * Microsoft icon.
     */
    Icon = 'ICON',

    /**
     * Phase One Raw Format.
     */
    Iiq = 'IIQ',

    /**
     * The image format and characteristics.
     */
    Info = 'INFO',

    /**
     * Base64-encoded inline images.
     */
    Inline = 'INLINE',

    /**
     * IPL Image Sequence.
     */
    Ipl = 'IPL',

    /**
     * ISO/TR 11548-1 format.
     */
    Isobrl = 'ISOBRL',

    /**
     * ISO/TR 11548-1 format 6dot.
     */
    Isobrl6 = 'ISOBRL6',

    /**
     * JPEG-2000 Code Stream Syntax.
     */
    J2c = 'J2C',

    /**
     * JPEG-2000 Code Stream Syntax.
     */
    J2k = 'J2K',

    /**
     * JPEG Network Graphics.
     */
    Jng = 'JNG',

    /**
     * Garmin tile format.
     */
    Jnx = 'JNX',

    /**
     * JPEG-2000 File Format Syntax.
     */
    Jp2 = 'JP2',

    /**
     * JPEG-2000 Code Stream Syntax.
     */
    Jpc = 'JPC',

    /**
     * Joint Photographic Experts Group JFIF format.
     */
    Jpe = 'JPE',

    /**
     * Joint Photographic Experts Group JFIF format.
     */
    Jpeg = 'JPEG',

    /**
     * Joint Photographic Experts Group JFIF format.
     */
    Jpg = 'JPG',

    /**
     * JPEG-2000 File Format Syntax.
     */
    Jpm = 'JPM',

    /**
     * Joint Photographic Experts Group JFIF format.
     */
    Jps = 'JPS',

    /**
     * JPEG-2000 File Format Syntax.
     */
    Jpt = 'JPT',

    /**
     * The image format and characteristics.
     */
    Json = 'JSON',

    /**
     * JPEG XL Lossless JPEG1 Recompression.
     */
    Jxl = 'JXL',

    /**
     * Raw black samples.
     */
    K = 'K',

    /**
     * Kodak Digital Camera Raw Format.
     */
    K25 = 'K25',

    /**
     * Kodak Digital Camera Raw Format.
     */
    Kdc = 'KDC',

    /**
     * Image label.
     */
    Label = 'LABEL',

    /**
     * Raw magenta samples.
     */
    M = 'M',

    /**
     * MPEG Video Stream.
     */
    M2v = 'M2V',

    /**
     * Raw MPEG-4 Video.
     */
    M4v = 'M4V',

    /**
     * MAC Paint.
     */
    Mac = 'MAC',

    /**
     * Colormap intensities and indices.
     */
    Map = 'MAP',

    /**
     * Image Clip Mask.
     */
    Mask = 'MASK',

    /**
     * MATLAB level 5 image format.
     */
    Mat = 'MAT',

    /**
     * MATTE format.
     */
    Matte = 'MATTE',

    /**
     * Minolta Digital Camera Raw Format.
     */
    Mdc = 'MDC',

    /**
     * Mamiya Raw Format.
     */
    Mef = 'MEF',

    /**
     * Magick Image File Format.
     */
    Miff = 'MIFF',

    /**
     * Multimedia Container.
     */
    Mkv = 'MKV',

    /**
     * Multiple-image Network Graphics.
     */
    Mng = 'MNG',

    /**
     * Raw bi-level bitmap.
     */
    Mono = 'MONO',

    /**
     * MPEG Video Stream.
     */
    Mov = 'MOV',

    /**
     * Aptus Leaf Raw Format.
     */
    Mos = 'MOS',

    /**
     * MPEG-4 Video Stream.
     */
    Mp4 = 'MP4',

    /**
     * Magick Persistent Cache image format.
     */
    Mpc = 'MPC',

    /**
     * MPEG Video Stream.
     */
    Mpeg = 'MPEG',

    /**
     * MPEG Video Stream.
     */
    Mpg = 'MPG',

    /**
     * Joint Photographic Experts Group JFIF format (Jpeg).
     */
    Mpo = 'MPO',

    /**
     * Sony (Minolta) Raw Format.
     */
    Mrw = 'MRW',

    /**
     * Magick Scripting Language.
     */
    Msl = 'MSL',

    /**
     * ImageMagick's own SVG internal renderer.
     */
    Msvg = 'MSVG',

    /**
     * MTV Raytracing image format.
     */
    Mtv = 'MTV',

    /**
     * Magick Vector Graphics.
     */
    Mvg = 'MVG',

    /**
     * Nikon Digital SLR Camera Raw Format.
     */
    Nef = 'NEF',

    /**
     * Nikon Digital SLR Camera Raw Format.
     */
    Nrw = 'NRW',

    /**
     * Constant image of uniform color.
     */
    Null = 'NULL',

    /**
     * Raw opacity samples.
     */
    O = 'O',

    /**
     * OpenRaster format.
     */
    Ora = 'ORA',

    /**
     * Olympus Digital Camera Raw Format.
     */
    Orf = 'ORF',

    /**
     * On-the-air bitmap.
     */
    Otb = 'OTB',

    /**
     * Open Type font.
     */
    Otf = 'OTF',

    /**
     * 16bit/pixel interleaved YUV.
     */
    Pal = 'PAL',

    /**
     * Palm pixmap.
     */
    Palm = 'PALM',

    /**
     * Common 2-dimensional bitmap format.
     */
    Pam = 'PAM',

    /**
     * Pango Markup Language.
     */
    Pango = 'PANGO',

    /**
     * Predefined pattern.
     */
    Pattern = 'PATTERN',

    /**
     * Portable bitmap format (black and white).
     */
    Pbm = 'PBM',

    /**
     * Photo CD.
     */
    Pcd = 'PCD',

    /**
     * Photo CD.
     */
    Pcds = 'PCDS',

    /**
     * Printer Control Language.
     */
    Pcl = 'PCL',

    /**
     * Apple Macintosh QuickDraw/PICT.
     */
    Pct = 'PCT',

    /**
     * ZSoft IBM PC Paintbrush.
     */
    Pcx = 'PCX',

    /**
     * Palm Database ImageViewer Format.
     */
    Pdb = 'PDB',

    /**
     * Portable Document Format.
     */
    Pdf = 'PDF',

    /**
     * Portable Document Archive Format.
     */
    Pdfa = 'PDFA',

    /**
     * Pentax Electronic Raw Format.
     */
    Pef = 'PEF',

    /**
     * Embrid Embroidery Format.
     */
    Pes = 'PES',

    /**
     * Postscript Type 1 font (ASCII).
     */
    Pfa = 'PFA',

    /**
     * Postscript Type 1 font (binary).
     */
    Pfb = 'PFB',

    /**
     * Portable float format.
     */
    Pfm = 'PFM',

    /**
     * Portable graymap format (gray scale).
     */
    Pgm = 'PGM',

    /**
     * JPEG 2000 uncompressed format.
     */
    Pgx = 'PGX',

    /**
     * Portable half float format.
     */
    Phm = 'PHM',

    /**
     * Personal Icon.
     */
    Picon = 'PICON',

    /**
     * Apple Macintosh QuickDraw/PICT.
     */
    Pict = 'PICT',

    /**
     * Alias/Wavefront RLE image format.
     */
    Pix = 'PIX',

    /**
     * Joint Photographic Experts Group JFIF format.
     */
    Pjpeg = 'PJPEG',

    /**
     * Plasma fractal image.
     */
    Plasma = 'PLASMA',

    /**
     * Portable Network Graphics.
     */
    Png = 'PNG',

    /**
     * PNG inheriting bit-depth and color-type from original.
     */
    Png00 = 'PNG00',

    /**
     * opaque or binary transparent 24-bit RGB.
     */
    Png24 = 'PNG24',

    /**
     * opaque or transparent 32-bit RGBA.
     */
    Png32 = 'PNG32',

    /**
     * opaque or binary transparent 48-bit RGB.
     */
    Png48 = 'PNG48',

    /**
     * opaque or transparent 64-bit RGBA.
     */
    Png64 = 'PNG64',

    /**
     * 8-bit indexed with optional binary transparency.
     */
    Png8 = 'PNG8',

    /**
     * Portable anymap.
     */
    Pnm = 'PNM',

    /**
     * Pocketmod Personal Organizer (Pdf).
     */
    Pocketmod = 'POCKETMOD',

    /**
     * Portable pixmap format (color).
     */
    Ppm = 'PPM',

    /**
     * PostScript.
     */
    Ps = 'PS',

    /**
     * Level II PostScript.
     */
    Ps2 = 'PS2',

    /**
     * Level III PostScript.
     */
    Ps3 = 'PS3',

    /**
     * Adobe Large Document Format.
     */
    Psb = 'PSB',

    /**
     * Adobe Photoshop bitmap.
     */
    Psd = 'PSD',

    /**
     * Pyramid encoded TIFF.
     */
    Ptif = 'PTIF',

    /**
     * Seattle Film Works.
     */
    Pwp = 'PWP',

    /**
     * Quite OK image format.
     */
    Qoi = 'QOI',

    /**
     * Raw red samples.
     */
    R = 'R',

    /**
     * Gradual radial passing from one shade to another.
     */
    RadialGradient = 'RADIAL-GRADIENT',

    /**
     * Fuji CCD-RAW Graphic File.
     */
    Raf = 'RAF',

    /**
     * SUN Rasterfile.
     */
    Ras = 'RAS',

    /**
     * Raw.
     */
    Raw = 'RAW',

    /**
     * Raw red, green, and blue samples.
     */
    Rgb = 'RGB',

    /**
     * Raw red, green, blue samples in 565 format.
     */
    Rgb565 = 'RGB565',

    /**
     * Raw red, green, blue, and alpha samples.
     */
    Rgba = 'RGBA',

    /**
     * Raw red, green, blue, and opacity samples.
     */
    Rgbo = 'RGBO',

    /**
     * LEGO Mindstorms EV3 Robot Graphic Format (black and white).
     */
    Rgf = 'RGF',

    /**
     * Alias/Wavefront image.
     */
    Rla = 'RLA',

    /**
     * Utah Run length encoded image.
     */
    Rle = 'RLE',

    /**
     * Raw Media Format.
     */
    Rmf = 'RMF',

    /**
     * Panasonic Lumix Raw Format.
     */
    Rw2 = 'RW2',

    /**
     * Leica Raw Format.
     */
    Rwl = 'RWL',

    /**
     * ZX-Spectrum SCREEN$.
     */
    Scr = 'SCR',

    /**
     * Screen shot.
     */
    Screenshot = 'SCREENSHOT',

    /**
     * Scitex HandShake.
     */
    Sct = 'SCT',

    /**
     * Seattle Film Works.
     */
    Sfw = 'SFW',

    /**
     * Irix RGB image.
     */
    Sgi = 'SGI',

    /**
     * Hypertext Markup Language and a client-side image map.
     */
    Shtml = 'SHTML',

    /**
     * DEC SIXEL Graphics Format.
     */
    Six = 'SIX',

    /**
     * DEC SIXEL Graphics Format.
     */
    Sixel = 'SIXEL',

    /**
     * Sparse Color.
     */
    SparseColor = 'SPARSE-COLOR',

    /**
     * Sony Raw Format 2.
     */
    Sr2 = 'SR2',

    /**
     * Sony Raw Format.
     */
    Srf = 'SRF',

    /**
     * Samsung Raw Format.
     */
    Srw = 'SRW',

    /**
     * Steganographic image.
     */
    Stegano = 'STEGANO',

    /**
     * Sinar CaptureShop Raw Format.
     */
    Sti = 'STI',

    /**
     * String to image and back.
     */
    StrImg = 'STRIMG',

    /**
     * SUN Rasterfile.
     */
    Sun = 'SUN',

    /**
     * Scalable Vector Graphics.
     */
    Svg = 'SVG',

    /**
     * Compressed Scalable Vector Graphics.
     */
    Svgz = 'SVGZ',

    /**
     * Text.
     */
    Text = 'TEXT',

    /**
     * Truevision Targa image.
     */
    Tga = 'TGA',

    /**
     * EXIF Profile Thumbnail.
     */
    Thumbnail = 'THUMBNAIL',

    /**
     * Tagged Image File Format.
     */
    Tif = 'TIF',

    /**
     * Tagged Image File Format.
     */
    Tiff = 'TIFF',

    /**
     * Tagged Image File Format (64-bit).
     */
    Tiff64 = 'TIFF64',

    /**
     * Tile image with a texture.
     */
    Tile = 'TILE',

    /**
     * PSX TIM.
     */
    Tim = 'TIM',

    /**
     * PS2 TIM2.
     */
    Tm2 = 'TM2',

    /**
     * TrueType font collection.
     */
    Ttc = 'TTC',

    /**
     * TrueType font.
     */
    Ttf = 'TTF',

    /**
     * Text.
     */
    Txt = 'TXT',

    /**
     * Unicode Text format.
     */
    Ubrl = 'UBRL',

    /**
     * Unicode Text format 6dot.
     */
    Ubrl6 = 'UBRL6',

    /**
     * X-Motif UIL table.
     */
    Uil = 'UIL',

    /**
     * 16bit/pixel interleaved YUV.
     */
    Uyvy = 'UYVY',

    /**
     * Truevision Targa image.
     */
    Vda = 'VDA',

    /**
     * VICAR rasterfile format.
     */
    Vicar = 'VICAR',

    /**
     * Visual Image Directory.
     */
    Vid = 'VID',

    /**
     * Khoros Visualization image.
     */
    Viff = 'VIFF',

    /**
     * VIPS image.
     */
    Vips = 'VIPS',

    /**
     * Truevision Targa image.
     */
    Vst = 'VST',

    /**
     * Open Web Media.
     */
    WebM = 'WEBM',

    /**
     * WebP Image Format.
     */
    WebP = 'WEBP',

    /**
     * Wireless Bitmap (level 0) image.
     */
    Wbmp = 'WBMP',

    /**
     * Windows Media Video.
     */
    Wmv = 'WMV',

    /**
     * Word Perfect Graphics.
     */
    Wpg = 'WPG',

    /**
     * Sigma Camera RAW Format.
     */
    X3f = 'X3F',

    /**
     * X Windows system bitmap (black and white).
     */
    Xbm = 'XBM',

    /**
     * Constant image uniform color.
     */
    Xc = 'XC',

    /**
     * GIMP image.
     */
    Xcf = 'XCF',

    /**
     * X Windows system pixmap (color).
     */
    Xpm = 'XPM',

    /**
     * Microsoft XML Paper Specification.
     */
    Xps = 'XPS',

    /**
     * Khoros Visualization image.
     */
    Xv = 'XV',

    /**
     * Raw yellow samples.
     */
    Y = 'Y',

    /**
     * The image format and characteristics.
     */
    Yaml = 'YAML',

    /**
     * Raw Y, Cb, and Cr samples.
     */
    Ycbcr = 'YCbCr',

    /**
     * Raw Y, Cb, Cr, and alpha samples.
     */
    Ycbcra = 'YCbCrA',

    /**
     * CCIR 601 4:1:1 or 4:2:2.
     */
    Yuv = 'YUV',
}
