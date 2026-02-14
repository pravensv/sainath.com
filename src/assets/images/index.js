import iphone15Pro from './iphone-15-pro.png';
import iphone15 from './iphone-15.png';
// New Apple Imports
import iphone14Pro from './iphone-14-pro.png';
import iphone13 from './iphone-13.png';
import iphone12Pro from './iphone-12-pro.png';
import iphone11 from './iphone-11.png';
import iphoneSE from './iphone-se.png';

// Samsung Imports
import samsungS24Ultra from './samsung-s24-ultra.png';
import samsungS24 from './samsung-s24.png';
import samsungS23Ultra from './samsung-s23-ultra.png';
import samsungA55 from './samsung-a55.png';
import samsungMSeries from './samsung-m-series.png';

// OnePlus Imports
import oneplus12 from './oneplus-12.png';
import oneplus11 from './oneplus-11.png';
import oneplus11R from './oneplus-11r.png';
import oneplusNord from './oneplus-nord.png';

// Xiaomi Imports
import xiaomi14Pro from './xiaomi-14-pro.png';
import xiaomi13 from './xiaomi-13.png';
import xiaomi12Pro from './xiaomi-12-pro.png';
import redmiNote13 from './redmi-note-13.png';

// Vivo imports
import vivoX100Pro from './vivo-x100-pro.png';
import vivoV30 from './vivo-v30.png';
import vivoY200 from './vivo-y200.png';

// Oppo imports
import oppoFindX7 from './oppo-find-x7.png';
import oppoReno11 from './oppo-reno-11.png';
import oppoA78 from './oppo-a78.png';

// Accessories
import case1 from './case-1.png';
import charger1 from './charger-1.png';
import speakerGo4 from './speaker-go4.png';
import speakerClip5 from './speaker-clip5.png';
import speakerFlip6 from './speaker-flip6.png';
import screenGuard1 from './screen-guard-1.png';
import torch1 from './torch-1.png';
import earphones1 from './earphones-1.png';


// Map product image keys to imported assets
// Brand-level images are shared across models of the same brand
const productImages = {
    // Apple
    'iphone-15-pro.jpg': iphone15Pro,
    'iphone-15.jpg': iphone15,
    'iphone-14-pro.jpg': iphone14Pro,
    'iphone-14.jpg': iphone13, // 14 standard looks often like 13 diagonal
    'iphone-13.jpg': iphone13,
    'iphone-12-pro.jpg': iphone12Pro,
    'iphone-12.jpg': iphone11, // Fallback/Grouping
    'iphone-11.jpg': iphone11,
    'iphone-se.jpg': iphoneSE,

    // Samsung
    'samsung-s24-ultra.jpg': samsungS24Ultra,
    'samsung-s24.jpg': samsungS24,
    'samsung-s23-ultra.jpg': samsungS23Ultra,
    'samsung-a55.jpg': samsungA55,
    'samsung-m-series.jpg': samsungMSeries,

    // OnePlus
    'oneplus-12.jpg': oneplus12,
    'oneplus-11.jpg': oneplus11,
    'oneplus-11r.jpg': oneplus11R,
    'oneplus-nord.jpg': oneplusNord,

    // Xiaomi
    'xiaomi-14-pro.jpg': xiaomi14Pro,
    'xiaomi-13.jpg': xiaomi13,
    'xiaomi-12-pro.jpg': xiaomi12Pro,
    'redmi-note-13.jpg': redmiNote13,

    // Vivo
    'vivo-x100-pro.jpg': vivoX100Pro,
    'vivo-v30-pro.jpg': vivoV30,
    'vivo-v30.jpg': vivoV30,
    'vivo-v29-pro.jpg': vivoV30,
    'vivo-t3.jpg': vivoY200, // T3 often looks like Y series
    'vivo-t2-pro.jpg': vivoV30,
    'vivo-y200e.jpg': vivoY200,

    // Oppo
    'oppo-find-x7-ultra.jpg': oppoFindX7,
    'oppo-find-x7.jpg': oppoFindX7,
    'oppo-reno-11-pro.jpg': oppoReno11,
    'oppo-reno-11.jpg': oppoReno11,
    'oppo-f25-pro.jpg': oppoReno11,
    'oppo-f23.jpg': oppoA78, // Use A78 for F23 as generic mid-range
    'oppo-a79.jpg': oppoA78,
    'oppo-a78.jpg': oppoA78,

    // Accessories
    'case-1.jpg': case1,
    'charger-1.jpg': charger1,
    'speaker-go4.jpg': speakerGo4,
    'speaker-clip5.jpg': speakerClip5,
    'speaker-flip6.jpg': speakerFlip6,
    'screen-guard-1.jpg': screenGuard1,
    'torch-1.jpg': torch1,
    'earphones-1.jpg': earphones1,
};

export const getProductImage = (imageKey) => {
    return productImages[imageKey] || null;
};

export default productImages;
