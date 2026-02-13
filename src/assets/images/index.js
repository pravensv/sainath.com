import iphone15Pro from './iphone-15-pro.png';
import iphone15 from './iphone-15.png';
import samsungS24Ultra from './samsung-s24-ultra.png';
import samsungS24 from './samsung-s24.png';
import oneplus12 from './oneplus-12.png';
import oneplus11 from './oneplus-11.png';
import xiaomi14Pro from './xiaomi-14-pro.png';
import xiaomi13 from './xiaomi-13.png';
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
    // Apple - Pro models use pro image, others use standard
    'iphone-15-pro.jpg': iphone15Pro,
    'iphone-15.jpg': iphone15,

    // Samsung - Ultra/Fold use ultra image, others use standard
    'samsung-s24-ultra.jpg': samsungS24Ultra,
    'samsung-s24.jpg': samsungS24,

    // OnePlus - Flagship use 12 image, others use 11
    'oneplus-12.jpg': oneplus12,
    'oneplus-11.jpg': oneplus11,

    // Xiaomi - Pro/Ultra use pro image, others use standard
    'xiaomi-14-pro.jpg': xiaomi14Pro,
    'xiaomi-13.jpg': xiaomi13,

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
