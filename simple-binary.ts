export class SimpleBinarySerializer {
    private _data: Buffer
    private _offset: number
    public constructor(data: Buffer, offset: number = 0) {
        this._data = data
        this._offset = offset
    }

    private checkCapacity(space: number): void {
        if (this._data.byteLength < this._offset + space) {
            this._data = Buffer.concat([this._data, this._data], this._data.byteLength * 2 || 1024)
        }
    }

    public getBuffer(): Buffer {
        return this._data.slice(0, this._offset)
    }

    public peekPacketType(): number {
        return this._data.readInt16LE(this._offset)
    }

    public readU8(): number {
        const v = this._data.readUInt8(this._offset)
        this._offset += 1
        return v
    }

    public readI8(): number {
        const v = this._data.readInt8(this._offset)
        this._offset += 1
        return v
    }

    public writeU8(v: number): void {
        this.checkCapacity(1)
        this._data.writeUInt8(v, this._offset)
        this._offset += 1
    }

    public writeI8(v: number): void {
        this.checkCapacity(1)
        this._data.writeInt8(v, this._offset)
        this._offset += 1
    }

    public readU16(): number {
        const v = this._data.readUInt16LE(this._offset)
        this._offset += 2
        return v
    }

    public readI16(): number {
        const v = this._data.readInt16LE(this._offset)
        this._offset += 2
        return v
    }

    public writeU16(v: number): void {
        this.checkCapacity(2)
        this._data.writeUInt16LE(v, this._offset)
        this._offset += 2
    }

    public writeI16(v: number): void {
        this.checkCapacity(2)
        this._data.writeInt16LE(v, this._offset)
        this._offset += 2
    }

    public readI32(): number {
        const v = this._data.readInt32LE(this._offset)
        this._offset += 4
        return v
    }

    public readU32(): number {
        const v = this._data.readUInt32LE(this._offset)
        this._offset += 4
        return v
    }

    public writeU32(v: number): void {
        this.checkCapacity(4)
        this._data.writeUInt32LE(v, this._offset)
        this._offset += 4
    }

    public writeI32(v: number): void {
        this.checkCapacity(4)
        this._data.writeInt32LE(v, this._offset)
        this._offset += 4
    }

    public readF32(): number {
        const v = this._data.readFloatLE(this._offset)
        this._offset += 4
        return v
    }

    public writeF32(v: number): void {
        this.checkCapacity(4)
        this._data.writeFloatLE(v, this._offset)
        this._offset += 4
    }

    public readF64(): number {
        const v = this._data.readDoubleLE(this._offset)
        this._offset += 8
        return v
    }

    public writeF64(v: number): void {
        this.checkCapacity(8)
        this._data.writeDoubleLE(v, this._offset)
        this._offset += 8
    }

    public readS16(): string {
        const l = this._data.readUInt16LE(this._offset)
        const end = this._offset + 2 + l
        const v = this._data.toString('utf8', this._offset + 2, end)
        this._offset = end
        return v
    }

    public writeS16(v: string): void {
        const l = Buffer.byteLength(v)
        this.checkCapacity(2 + l)
        this._data.writeUInt16LE(l, this._offset)
        this._data.write(v, this._offset + 2, l)
        this._offset += 2 + l
    }
}