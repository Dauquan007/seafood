import React, { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function ContainerPanel(){
const [containers,setContainers] = useState<any[]>([])

useEffect(()=>{


loadContainers()

const channel = supabase
  .channel("containers-changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "containers"
    },
    (payload) => {
      fetchContainers()
    }
  )
  .subscribe()

return () => {
  supabase.removeChannel(channel)
}
}, [])

async function loadContainers(){
const {data,error} = await supabase
.from("containers")
.select("*")

if(data){
setContainers(data)
}

}
return (
  <div className="bg-white rounded-xl shadow p-4">
    <h2 className="text-lg font-bold mb-4">Live Containers</h2>

    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th>ID</th>
          <th>Route</th>
          <th>Temp</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {containers.map(c=>(
<div key={c.id} className="border-b border-slate-700 py-2">
{c.id} — {c.route} — {c.status}
</div>
        ))}
      </tbody>
    </table>
  </div>
  
)
}


