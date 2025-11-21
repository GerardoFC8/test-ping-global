"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Info } from "lucide-react"

export function Disclaimer() {
  const { t } = useLanguage()
  
  return (
    <Card className="mt-12 border-muted">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5" />
          {t.aboutThisTool}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div>
          <h3 className="font-semibold text-foreground mb-2">{t.serverList}</h3>
          <p>
            {t.serverListDescription}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-2">{t.howPingWorks}</h3>
          <p className="mb-4">
            {t.howPingWorksDescription}
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">{t.httpPingTitle}</h4>
              <p className="mb-2">
                {t.httpPingDescription}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>{t.httpPingList1}</li>
                <li>{t.httpPingList2}</li>
                <li>{t.httpPingList3}</li>
                <li>{t.httpPingList4}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">{t.icmpPingTitle}</h4>
              <p className="mb-2">
                {t.icmpPingDescription}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>{t.icmpPingList1}</li>
                <li>{t.icmpPingList2}</li>
                <li>{t.icmpPingList3}</li>
                <li>{t.icmpPingList4}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">{t.differencesTitle}</h4>
              <p className="mb-2">
                {t.differencesDescription}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>{t.differencesList1}</li>
                <li>{t.differencesList2}</li>
                <li>{t.differencesList3}</li>
              </ul>
              <p className="mt-2">
                {t.differencesNote}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">{t.dataStorage}</h3>
          <p>
            {t.dataStorageDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

