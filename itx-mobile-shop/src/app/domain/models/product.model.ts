export interface Product {
    id: string;
    brand: string;
    model: string;
    price: number | string;
    imgUrl: string;
  }
  
  export interface ProductDetail extends Product {
    networkTechnology: string;
    networkSpeed: string;
    gprs: string;
    edge: string;
    announced: string;
    status: string;
    dimentions: string;
    weight: string;
    sim: string;
    displayType: string;
    displayResolution: string;
    displaySize: string;
    os: string;
    cpu: string;
    chipset: string;
    gpu: string;
    externalMemory: string;
    internalMemory: string[];
    ram: string;
    primaryCamera: string[];
    secondaryCmera: string[];
    speaker: string;
    audioJack: string;
    wlan: string[];
    bluetooth: string[];
    gps: string;
    nfc: string;
    radio: string;
    usb: string;
    sensors: string[];
    battery: string;
    colors: string[];
    options: ProductOptions;
  }
  
  export interface ProductOptions {
    colors: Option[];
    storages: Option[];
  }
  
  export interface Option {
    code: number | string;
    name: string;
  }
  