import { type LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface NavItem {
  name: string
  key: string
  icon: LucideIcon
  onClick: () => void
}

interface NavBarProps {
  items: NavItem[]
  activeTab: string
  setActiveTab: (name: string) => void
  className?: string
}

export function NavBar({ items, activeTab, setActiveTab, className }: NavBarProps) {
  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw] ${className || ''}`}
    >
      <div className="flex items-center gap-1 bg-[#FAF5F0]/80 border border-[#8A78B4]/20 backdrop-blur-lg py-1.5 px-2 rounded-full shadow-lg">
        {items.map((item) => {
          const isActive = activeTab === item.key

          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key)
                item.onClick()
              }}
              className={`
                relative cursor-pointer text-[10px] md:text-sm font-semibold px-2.5 md:px-6 py-2 rounded-full transition-all duration-300 select-none outline-none border-none
                ${isActive ? 'text-[#0A0A0A]' : 'text-gray-500 hover:text-[#8A78B4]'}
              `}
            >
              <span className="inline">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[#8A78B4]/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Decorative glowing lamp effect matching the luxury layout theme */}
                  <div className="absolute -top-1 md:-top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#8A78B4] rounded-t-full">
                    <div className="absolute w-12 h-6 bg-[#8A78B4]/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#8A78B4]/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#8A78B4]/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
