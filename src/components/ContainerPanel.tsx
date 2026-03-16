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
return(
<div className="card mt-6">
<h3 className="font-bold mb-4">Containers</h3>

{containers.map(c=>(
<div key={c.id} className="border-b border-slate-700 py-2">
{c.id} — {c.route} — {c.status}
</div>
))}

</div>
)

}


