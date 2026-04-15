import { useEffect } from "react"
import { useSettingStore } from "./settingsStore"
import { useMusicStore } from "./musicStore"
import { useBackgroundStore } from "./backgroundStore"
import { useNavigationStore } from "./navigationStore"
import { useTimerStore } from "./timerStore"

export const StoreInitializer = () => {
  const initSettings   = useSettingStore((s) => s.init)
  const initSong       = useMusicStore((s) => s.init)
  const initBackground = useBackgroundStore((s) => s.init)
  const initNavigation = useNavigationStore((s) => s.init)
  const initTimers     = useTimerStore((s) => s.init)

  useEffect(() => {
    initSettings()
    initSong()
    initBackground()
    initNavigation()
    initTimers()
  }, [initSettings, initSong, initBackground, initNavigation, initTimers])

  return null
}
