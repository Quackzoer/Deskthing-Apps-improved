import { useEffect } from "react"
import { useSettingStore } from "./settingsStore"
import { useMusicStore } from "./musicStore"
import { useBackgroundStore } from "./backgroundStore"
import { useNavigationStore } from "./navigationStore"
import { useTimerStore } from "./timerStore"
import { useDateStore } from "./dateStore"

export const StoreInitializer = () => {
  const initSettings   = useSettingStore((s) => s.init)
  const initSong       = useMusicStore((s) => s.init)
  const initBackground = useBackgroundStore((s) => s.init)
  const initNavigation = useNavigationStore((s) => s.init)
  // Initialise with sensible defaults; Clock.tsx calls updateDefaults()
  // once the real values arrive from the settings store.
  const initTimers     = useTimerStore((s) => s.init)
  const initDate = useDateStore((s)=>s.init)

  useEffect(() => {
    initSettings()
    initSong()
    initBackground()
    initNavigation()
    initTimers()
    initDate()
  }, [initSettings, initSong, initBackground, initNavigation, initTimers, initDate])

  return null
}
