import type { InjectionKey } from 'vue'
const $paginationSizes = Symbol() as InjectionKey<number[]>;
const paginationSizes = [10,25,50,100,500]
export {
    $paginationSizes,
    paginationSizes,
}