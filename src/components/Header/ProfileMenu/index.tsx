'use client'

import { useState, useRef, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link'

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const data = {
    "submenu": [
      {
        "text": "Editar informações",
        "link": null
      },
      {
        "text": "Conta",
        "link": "/terapias-corporais-e-fisicas"
      }
    ]
  }

  return (
    <div className="relative z-10" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-blue-700 transition-colors aspect-square h-[40px] w-[40px]"
        aria-expanded={isOpen}
        aria-label="Menu do perfil"
      >
        <Image
          src='/images/profile.jpeg'
          alt=''
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center rounded-full"
          fill
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all ${isOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2'
          }`}
      >

        <ul className="py-2">
          {data.submenu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link || `#`}
                className="block px-4 py-2 text-sm text-[#1D1B20] hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            </li>
          ))}
          <div className="border-t border-t-[#645D6F] mx-3 mt-2" />
          <li>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-[#3857F4] hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Trocar para Perfil Profissional
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}