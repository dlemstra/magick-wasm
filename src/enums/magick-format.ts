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
     * 3FR.
     */
    ThreeFr = '3FR',

    /**
     * 3G2.
     */
    ThreeG2 = '3G2',

    /**
     * 3GP.
     */
    ThreeGp = '3GP',

    /**
     * A.
     */
    A = 'A',

    /**
     * Aai.
     */
    Aai = 'AAI',

    /**
     * Ai.
     */
    Ai = 'AI',

    /**
     * Apng.
     */
    Apng = 'APNG',

    /**
     * ART.
     */
    Art = 'ART',

    /**
     * Arw.
     */
    Arw = 'ARW',

    /**
     * Ashlar.
     */
    Ashlar = 'ASHLAR',

    /**
     * Avi.
     */
    Avi = 'AVI',

    /**
     * Avif.
     */
    Avif = 'AVIF',

    /**
     * Avs.
     */
    Avs = 'AVS',

    /**
     * B.
     */
    B = 'B',

    /**
     * Bayer
     */
    Bayer = 'BAYER',

    /**
     * Bayera.
     */
    Bayera = 'BAYERA',

    /**
     * Bgr.
     */
    Bgr = 'BGR',

    /**
     * Bgra.
     */
    Bgra = 'BGRA',

    /**
     * Bgro.
     */
    Bgro = 'BGRO',

    /**
     * Bmp.
     */
    Bmp = 'BMP',

    /**
     * Bmp 2.
     */
    Bmp2 = 'BMP2',

    /**
     * Bmp 3.
     */
    Bmp3 = 'BMP3',

    /**
     * Brf.
     */
    Brf = 'BRF',

    /**
     * C.
     */
    C = 'C',

    /**
     * Cal.
     */
    Cal = 'CAL',

    /**
     * Cals.
     */
    Cals = 'CALS',

    /**
     * Canvas.
     */
    Canvas = 'CANVAS',

    /**
     * Caption.
     */
    Caption = 'CAPTION',

    /**
     * Cin.
     */
    Cin = 'CIN',

    /**
     * Cip.
     */
    Cip = 'CIP',

    /**
     * Clip.
     */
    Clip = 'CLIP',

    /**
     * Cmyk.
     */
    Cmyk = 'CMYK',

    /**
     * Cmyka.
     */
    Cmyka = 'CMYKA',

    /**
     * Cr2.
     */
    Cr2 = 'CR2',

    /**
     * Cr3.
     */
    Cr3 = 'CR3',

    /**
     * Crw.
     */
    Crw = 'CRW',

    /**
     * Cube.
     */
    Cube = 'CUBE',

    /**
     * Cur.
     */
    Cur = 'CUR',

    /**
     * Cut.
     */
    Cut = 'CUT',

    /**
     * Data
     */
    Data = 'DATA',

    /**
     * Dcm.
     */
    Dcm = 'DCM',

    /**
     * Dcr.
     */
    Dcr = 'DCR',

    /**
     * Dcraw.
     */
    Dcraw = 'DCRAW',

    /**
     * Dcx.
     */
    Dcx = 'DCX',

    /**
     * Dds.
     */
    Dds = 'DDS',

    /**
     * Dfont.
     */
    Dfont = 'DFONT',

    /**
     * Dng.
     */
    Dng = 'DNG',

    /**
     * Dpx.
     */
    Dpx = 'DPX',

    /**
     * Dxt1.
     */
    Dxt1 = 'DXT1',

    /**
     * Dxt5.
     */
    Dxt5 = 'DXT5',

    /**
     * Epdf.
     */
    Epdf = 'EPDF',

    /**
     * Epi.
     */
    Epi = 'EPI',

    /**
     * Eps.
     */
    Eps = 'EPS',

    /**
     * Eps 2.
     */
    Eps2 = 'EPS2',

    /**
     * Eps 3.
     */
    Eps3 = 'EPS3',

    /**
     * Epsf.
     */
    Epsf = 'EPSF',

    /**
     * Epsi.
     */
    Epsi = 'EPSI',

    /**
     * Ept.
     */
    Ept = 'EPT',

    /**
     * Ept 2.
     */
    Ept2 = 'EPT2',

    /**
     * Ept 3.
     */
    Ept3 = 'EPT3',

    /**
     * Erf.
     */
    Erf = 'ERF',

    /**
     * Exr.
     */
    Exr = 'EXR',

    /**
     * Farbfeld.
     */
    Farbfeld = 'FARBFELD',

    /**
     * Fax.
     */
    Fax = 'FAX',

    /**
     * Ff.
     */
    Ff = 'FF',

    /**
     * File.
     */
    File = 'FILE',

    /**
     * Fits.
     */
    Fits = 'FITS',

    /**
     * Fl32.
     */
    Fl32 = 'FL32',

    /**
     * Flv.
     */
    Flv = 'FLV',

    /**
     * Fractal.
     */
    Fractal = 'FRACTAL',

    /**
     * Ftp.
     */
    Ftp = 'FTP',

    /**
     * Ftxt.
     */
    Ftxt = 'FTXT',

    /**
     * Fts.
     */
    Fts = 'FTS',

    /**
     * G.
     */
    G = 'G',

    /**
     * G3.
     */
    G3 = 'G3',

    /**
     * G4.
     */
    G4 = 'G4',

    /**
     * Gif.
     */
    Gif = 'GIF',

    /**
     * Gif 87.
     */
    Gif87 = 'GIF87',

    /**
     * Gradient.
     */
    Gradient = 'GRADIENT',

    /**
     * Gray.
     */
    Gray = 'GRAY',

    /**
     * Graya.
     */

    Graya = 'GRAYA',
    /**
     * Group 4.
     */
    Group4 = 'GROUP4',

    /**
     * Hald.
     */
    Hald = 'HALD',

    /**
     * Hdr.
     */
    Hdr = 'HDR',

    /**
     * Heic.
     */
    Heic = 'HEIC',

    /**
     * Heif.
     */
    Heif = 'HEIF',

    /**
     * Histogram.
     */
    Histogram = 'HISTOGRAM',

    /**
     * Hrz.
     */
    Hrz = 'HRZ',

    /**
     * Htm.
     */
    Htm = 'HTM',

    /**
     * Html.
     */
    Html = 'HTML',

    /**
     * Http.
     */
    Http = 'HTTP',

    /**
     * Https.
     */
    Https = 'HTTPS',

    /**
     * Icb.
     */
    Icb = 'ICB',

    /**
     * Ico.
     */
    Ico = 'ICO',

    /**
     * Icon.
     */
    Icon = 'ICON',

    /**
     * Iiq.
     */
    Iiq = 'IIQ',

    /**
     * Info.
     */
    Info = 'INFO',

    /**
     * Inline.
     */
    Inline = 'INLINE',

    /**
     * Ipl.
     */
    Ipl = 'IPL',

    /**
     * Isobrl.
     */
    Isobrl = 'ISOBRL',

    /**
     * Isobrl 6.
     */
    Isobrl6 = 'ISOBRL6',

    /**
     * J2c.
     */
    J2c = 'J2C',

    /**
     * J2k.
     */
    J2k = 'J2K',

    /**
     * Jng.
     */
    Jng = 'JNG',

    /**
     * Jnx.
     */
    Jnx = 'JNX',

    /**
     * Jp2.
     */
    Jp2 = 'JP2',

    /**
     * Jpc.
     */
    Jpc = 'JPC',

    /**
     * Jpe.
     */
    Jpe = 'JPE',

    /**
     * Jpeg.
     */
    Jpeg = 'JPEG',

    /**
     * Jpg.
     */
    Jpg = 'JPG',

    /**
     * Jpm.
     */
    Jpm = 'JPM',

    /**
     * Jps.
     */
    Jps = 'JPS',

    /**
     * Jpt.
     */
    Jpt = 'JPT',

    /**
     * Json.
     */
    Json = 'JSON',

    /**
     * Jxl.
     */
    Jxl = 'JXL',

    /**
     * K.
     */
    K = 'K',

    /**
     * K25.
     */
    K25 = 'K25',

    /**
     * Kdc.
     */
    Kdc = 'KDC',

    /**
     * Label.
     */
    Label = 'LABEL',

    /**
     * M.
     */
    M = 'M',

    /**
     * M2v.
     */
    M2v = 'M2V',

    /**
     * M4v.
     */
    M4v = 'M4V',

    /**
     * Mac.
     */
    Mac = 'MAC',

    /**
     * Map.
     */
    Map = 'MAP',

    /**
     * Mask.
     */
    Mask = 'MASK',

    /**
     * Mat.
     */
    Mat = 'MAT',

    /**
     * Matte.
     */
    Matte = 'MATTE',

    /**
     * Mef.
     */
    Mef = 'MEF',

    /**
     * Miff.
     */
    Miff = 'MIFF',

    /**
     * Mkv.
     */
    Mkv = 'MKV',

    /**
     * Mng.
     */
    Mng = 'MNG',

    /**
     * Mono.
     */
    Mono = 'MONO',

    /**
     * Mov.
     */
    Mov = 'MOV',

    /**
     * Mp4.
     */
    Mp4 = 'MP4',

    /**
     * Mpc.
     */
    Mpc = 'MPC',

    /**
     * Mpeg.
     */
    Mpeg = 'MPEG',

    /**
     * Mpg.
     */
    Mpg = 'MPG',

    /**
     * Mpo.
     */
    Mpo = 'MPO',

    /**
     * Mrw.
     */
    Mrw = 'MRW',

    /**
     * Msl.
     */
    Msl = 'MSL',

    /**
     * Msvg.
     */
    Msvg = 'MSVG',

    /**
     * Mtv.
     */
    Mtv = 'MTV',

    /**
     * Mvg.
     */
    Mvg = 'MVG',

    /**
     * Nef.
     */
    Nef = 'NEF',

    /**
     * Nrw.
     */
    Nrw = 'NRW',

    /**
     * Null.
     */
    Null = 'NULL',

    /**
     * O.
     */
    O = 'O',

    /**
     * Ora.
     */
    Ora = 'ORA',

    /**
     * Orf.
     */
    Orf = 'ORF',

    /**
     * Otb.
     */
    Otb = 'OTB',

    /**
     * Otf.
     */
    Otf = 'OTF',

    /**
     * Pal.
     */
    Pal = 'PAL',

    /**
     * Palm.
     */
    Palm = 'PALM',

    /**
     * Pam.
     */
    Pam = 'PAM',

    /**
     * Pango.
     */
    Pango = 'PANGO',

    /**
     * Pattern.
     */
    Pattern = 'PATTERN',

    /**
     * Pbm.
     */
    Pbm = 'PBM',

    /**
     * Pcd.
     */
    Pcd = 'PCD',

    /**
     * Pcds.
     */
    Pcds = 'PCDS',

    /**
     * Pcl.
     */
    Pcl = 'PCL',

    /**
     * Pct.
     */
    Pct = 'PCT',

    /**
     * Pcx.
     */
    Pcx = 'PCX',

    /**
     * Pdb.
     */
    Pdb = 'PDB',

    /**
     * Pdf.
     */
    Pdf = 'PDF',

    /**
     * Pdfa.
     */
    Pdfa = 'PDFA',

    /**
     * Pef.
     */
    Pef = 'PEF',

    /**
     * Pes.
     */
    Pes = 'PES',

    /**
     * Pfa.
     */
    Pfa = 'PFA',

    /**
     * Pfb.
     */
    Pfb = 'PFB',

    /**
     * Pfm.
     */
    Pfm = 'PFM',

    /**
     * Pgm.
     */
    Pgm = 'PGM',

    /**
     * Pgx.
     */
    Pgx = 'PGX',

    /**
     * Phm.
     */
    Phm = 'PHM',

    /**
     * Picon.
     */
    Picon = 'PICON',

    /**
     * Pict.
     */
    Pict = 'PICT',

    /**
     * Pix.
     */
    Pix = 'PIX',

    /**
     * Pjpeg.
     */
    Pjpeg = 'PJPEG',

    /**
     * Plasma.
     */
    Plasma = 'PLASMA',

    /**
     * Png.
     */
    Png = 'PNG',

    /**
     * Png 00.
     */
    Png00 = 'PNG00',

    /**
     * Png 24.
     */
    Png24 = 'PNG24',

    /**
     * Png 32.
     */
    Png32 = 'PNG32',

    /**
     * Png 48.
     */
    Png48 = 'PNG48',

    /**
     * Png 64.
     */
    Png64 = 'PNG64',

    /**
     * Png 8.
     */
    Png8 = 'PNG8',

    /**
     * Pnm.
     */
    Pnm = 'PNM',

    /**
     * Pocketmod.
     */
    Pocketmod = 'POCKETMOD',

    /**
     * Ppm.
     */
    Ppm = 'PPM',

    /**
     * Ps.
     */
    Ps = 'PS',

    /**
     * Ps 2.
     */
    Ps2 = 'PS2',

    /**
     * Ps 3.
     */
    Ps3 = 'PS3',

    /**
     * Psb.
     */
    Psb = 'PSB',

    /**
     * Psd.
     */
    Psd = 'PSD',

    /**
     * Ptif.
     */
    Ptif = 'PTIF',

    /**
     * Pwp.
     */
    Pwp = 'PWP',

    /**
     * Qoi
     */
    Qoi = 'QOI',

    /**
     * R.
     */
    R = 'R',

    /**
     * Radial gradient.
     */
    RadialGradient = 'RADIAL-GRADIENT',

    /**
     * Raf.
     */
    Raf = 'RAF',

    /**
     * Ras.
     */
    Ras = 'RAS',

    /**
     * Raw.
     */
    Raw = 'RAW',

    /**
     * Rgb.
     */
    Rgb = 'RGB',

    /**
     * Rgb 565.
     */
    Rgb565 = 'RGB565',

    /**
     * Rgba.
     */
    Rgba = 'RGBA',

    /**
     * Rgbo.
     */
    Rgbo = 'RGBO',

    /**
     * Rgf.
     */
    Rgf = 'RGF',

    /**
     * Rla.
     */
    Rla = 'RLA',

    /**
     * Rle.
     */
    Rle = 'RLE',

    /**
     * Rmf.
     */
    Rmf = 'RMF',

    /**
     * Rw 2.
     */
    Rw2 = 'RW2',

    /**
     * Scr.
     */
    Scr = 'SCR',

    /**
     * Screenshot.
     */
    Screenshot = 'SCREENSHOT',

    /**
     * Sct.
     */
    Sct = 'SCT',

    /**
     * Sfw.
     */
    Sfw = 'SFW',

    /**
     * Sgi.
     */
    Sgi = 'SGI',

    /**
     * Shtml.
     */
    Shtml = 'SHTML',

    /**
     * Six.
     */
    Six = 'SIX',

    /**
     * Sixel.
     */
    Sixel = 'SIXEL',

    /**
     * Sparse color.
     */
    SparseColor = 'SPARSE-COLOR',

    /**
     * Sr2.
     */
    Sr2 = 'SR2',

    /**
     * Srf.
     */
    Srf = 'SRF',

    /**
     * Stegano.
     */
    Stegano = 'STEGANO',

    /**
     * Str img.
     */
    StrImg = 'STRIMG',

    /**
     * Sun.
     */
    Sun = 'SUN',

    /**
     * Svg.
     */
    Svg = 'SVG',

    /**
     * Svgz.
     */
    Svgz = 'SVGZ',

    /**
     * Text.
     */
    Text = 'TEXT',

    /**
     * Tga.
     */
    Tga = 'TGA',

    /**
     * Thumbnail.
     */
    Thumbnail = 'THUMBNAIL',

    /**
     * Tiff.
     */
    Tiff = 'TIFF',

    /**
     * Tiff 64.
     */
    Tiff64 = 'TIFF64',

    /**
     * Tile.
     */
    Tile = 'TILE',

    /**
     * Tim.
     */
    Tim = 'TIM',

    /**
     * Tm 2.
     */
    Tm2 = 'TM2',

    /**
     * Ttc.
     */
    Ttc = 'TTC',

    /**
     * Ttf.
     */
    Ttf = 'TTF',

    /**
     * Txt.
     */
    Txt = 'TXT',

    /**
     * Ubrl.
     */
    Ubrl = 'UBRL',

    /**
     * Ubrl 6.
     */
    Ubrl6 = 'UBRL6',

    /**
     * Uil.
     */
    Uil = 'UIL',

    /**
     * Uyvy.
     */
    Uyvy = 'UYVY',

    /**
     * Vda.
     */
    Vda = 'VDA',

    /**
     * Vicar.
     */
    Vicar = 'VICAR',

    /**
     * Vid.
     */
    Vid = 'VID',

    /**
     * Viff.
     */
    Viff = 'VIFF',

    /**
     * Vips.
     */
    Vips = 'VIPS',

    /**
     * Vst.
     */
    Vst = 'VST',

    /**
     * Wbmp.
     */
    Wbmp = 'WBMP',

    /**
     * Webp.
     */
    Webp = 'WEBP',

    /**
     * Webm.
     */
    Webm = 'WEBM',

    /**
     * Wmv.
     */
    Wmv = 'WMV',

    /**
     * Wpg.
     */
    Wpg = 'WPG',

    /**
     * X3f.
     */
    X3f = 'X3F',

    /**
     * Xbm.
     */
    Xbm = 'XBM',

    /**
     * Xc.
     */
    Xc = 'XC',

    /**
     * Xcf.
     */
    Xcf = 'XCF',

    /**
     * Xpm.
     */
    Xpm = 'XPM',

    /**
     * Xps.
     */
    Xps = 'XPS',

    /**
     * Xv.
     */
    Xv = 'XV',

    /**
     * Y.
     */
    Y = 'Y',

    /**
     * Yaml.
     */
    Yaml = 'YAML',

    /**
     * Ycbcr.
     */
    Ycbcr = 'YCbCr',

    /**
     * Ycbcra.
     */
    Ycbcra = 'YCbCrA',

    /**
     * Yuv.
     */
    Yuv = 'YUV'
}
