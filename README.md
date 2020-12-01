# Typescript support for lightweight simple binary format.
Typescript support for using generated user types from [simple binary format](https://github.com/Leopotam/simplebinary.git).

# Example
Scheme of user types:
```json
{
    "Item": {
        "id": "u32",
        "count": "u32"
    },
    "Inventory": {
        "items": "Item[]"
    }
}
```
Typescript serialize / deserialize code:
```ts
import { SimpleBinarySerializer } from './simple-binary'
import * as Packets from './Packets'

const inv = new Packets.Inventory()
const item = new Packets.Item()
item.id = 1
item.count = 2
inv.items.push(item)
// serialize.
const sbs = new SimpleBinarySerializer(Buffer.allocUnsafe(1024))
inv.serialize(sbs)
const buf = sbs.getBuffer()
// deserialize.
const sbs2 = new SimpleBinarySerializer(buf)
if (sbs2.peekPacketType() !== Packets.Inventory.SB_PacketId) {
    throw new Error('invalid type')
}
const inv2 = Packets.Inventory.deserialize(sbs2)
// inv2.items[0].id === 1
// inv2.items[0].count === 2
```