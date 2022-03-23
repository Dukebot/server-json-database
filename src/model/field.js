const TYPE = {
    STRING: "string",
    TEXT: "string",

    NUMBER: "number",
    NUMERIC: "number",
    FLOAT: "number",

    INTEGER: "integer",
    
    BOOL: "boolean",
    BOOLEAN: "boolean",
    
    OBJECT: "object",
    ARRAY: "array",
    CONTAINER: "container"
};
Object.freeze(TYPE);

class Field {

    /**
     * Instanciates a new object with the given conf object properties.
     * @param {*} conf 
     */
    constructor(conf) {
        if (!conf.type) throw Error("Type is mandatory.");

        this.id = conf.id;
        this.key = conf.key;
        this.name = conf.name;
        this.description = conf.description;        
        this.is_nullable = conf.is_nullable;
        this.type = conf.type;
        this.default_value = conf.default_value;
        this.value = conf.value;
        this.min = conf.min;
        this.max = conf.max;
        this.fields = null;

        if (this.type == TYPE.CONTAINER) {
            this.fields = [];
            for (const field_conf of conf.fields) {
                this.addField(field_conf);
            }
        }

        if (!this._value) this._value = this._default_value;
    }

    get id() { return this._id; }
    set id(value) { this._id = value; }

    get key() { return this._key; }
    set key(value) { this._key = value; }

    get name() { return this._name; }
    set name(value) { this._name = value; }

    get description() { return this._description; }
    set description(value) { this._description = value; }

    get type() { return this._type; }
    set type(value) {
        if (!TYPE[value.toUpperCase()]) {
            throw new Error("Invalid type -> " + value);
        }
        this._type = TYPE[value.toUpperCase()];
    }

    get value() { return this._value; }
    set value(value) {
        this._value = value;
        this.checkIfValueIsCorrect(this.value);
    }

    get default_value() { return this._default_value; }
    set default_value(value) {
        this._default_value = value;
        this.checkIfValueIsCorrect(this.default_value);
    }

    get min() { return this._min; }
    set min(value) { this._min = value; }

    get max() { return this._max; }
    set max(value) { this._max = value; }

    get fields() { return this._fields; }
    set fields(value) { this._fields = value; }

    get is_nullable() { return this._is_nullable; }
    set is_nullable(value) { 
        this._is_nullable = value; 
        if (this.is_nullable !== false) 
            this._is_nullable = true;
    }

    /**
     * Checks if a value type is correct given the type member variable.
     * @param {*} value 
     */
    checkIfValueIsCorrect(value) {
        if (value === null && !this.is_nullable) {
            throw new Error("This field (" + this.name + ") it's not nullable");
        }
        if (this.isNumeric(this.type)) {
            if (!this.isNumeric(typeof value)) {
                if (value === null && !this.is_nullable) {
                    throw new Error("Must provide a numeric value.");
                }
            }  
        }
        if (this.isText(this.type)) {
            if (!this.isText(typeof value)) {
                if (value === null && !this.is_nullable) {
                    throw new Error("Must provide a text value.");
                }
            }
        }
        if (this.isBoolean(this.type)) {
            if (!this.isBoolean(typeof value)) {
                if (value === null && !this.is_nullable) {
                    throw new Error("Must provide a boolean value.");
                }
            }
        }
    }

    addField(conf) {
        const field = new Field(conf);
        this.fields.push(field);
    }

    isContainer() {
        return this.type == TYPE.CONTAINER;
    }

    isNumeric(type) {
        return type == 'numeric'
            || type == 'number'
            || type == 'float'
            || type == 'integer'
            || type == 'int';
    }

    isText(type) {
        return type == 'text'
            || type == 'string';
    }

    isBoolean(type) {
        return type == 'boolean'
            || type == 'bool';
    }
}

module.exports = Field;