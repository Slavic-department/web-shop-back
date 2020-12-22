import { Prop } from "@nestjs/mongoose"

export class ProcessorProperties {
    // Линейка
    @Prop() model: string
    // Разъем процессора
    @Prop() socket: string
    // Совместимость
    @Prop() compatibility: string
    // Количество ядер
    @Prop() coresCount: number
    // Количество потоков
    @Prop() threadsCount: number
    // Частота процессора (ГГц)
    @Prop() frequency: number
    // Объекм кэша (Мб)
    @Prop() cashAmount: number
    // Ядро
    @Prop() core: string
    // Название графического процессора
    @Prop() graphicsProcessorName: string
    // Разблокированный множитель (параметр, который указывает над доступность к разгону процессора)
    @Prop() isUnlockedMultiplier: boolean
    // Максимальный объем памяти
    @Prop() maxMemoryAmount: number
    // Техпроцесс (нм)
    @Prop() techProcess: number
    // Термопакет (Вт)
    @Prop() termoPackage: number
    // Производительность (points)
    @Prop() performance: number
}