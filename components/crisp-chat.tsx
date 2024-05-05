"use client";

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("7c539c2d-9788-4cb8-aca0-58f133e797a4")
  }, [])

  return null
}