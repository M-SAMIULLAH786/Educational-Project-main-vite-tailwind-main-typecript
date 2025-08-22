"use client"

import { Outlet, useLocation } from "react-router-dom"
import AppSidebar from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import data from "./data.json"

export default function DashboardLayout() {
    const location = useLocation()

    const isDashboardHome = location.pathname === "/"

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            
            <AppSidebar />

            <SidebarInset>
                
                <SiteHeader />

                <div className="flex flex-1 flex-col overflow-auto h-full bg-white">
                    <div className="flex flex-1 flex-col">
                        <Outlet />

                        {isDashboardHome && (
                            <div className="flex flex-col gap-6 py-6">
                                <SectionCards />
                                <div className="px-6">
                                    <ChartAreaInteractive />
                                </div>
                                <DataTable data={data} />
                            </div>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
