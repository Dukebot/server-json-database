const Field = require('./field');
const Utils = require('../utils');

const KEY_TYPES = ["key", "id", "day"];
const SCHEMA_PATH = 'data/v2/schema/';
const DATA_PATH = 'data/v2/data/';

const getSchemaPathAbsolute = (key) => SCHEMA_PATH + key + '.json';
const getDataPathAbsolute = (key) => DATA_PATH + key + '.json';

const getSchemaPathRelative = (key) => '../../' + getSchemaPathAbsolute(key);
const getDataPathRelative = (key) => '../../' + getDataPathAbsolute(key);

const getSchema = (key) => require(getSchemaPathRelative(key));
const getData = (key) => require(getDataPathRelative(key));

class Item {

    constructor(key) {
        this._id = null;
        this._key = null;
        this._name = null;
        this._description = null;
        this._key_type = null;
        this._fields = null;

        this.init(key);
    }

    init(key) {
        this.key = key;

        const schema = this.getSchema();

        this.id = schema.id;
        this.key = schema.key;
        this.name = schema.name;
        this.description = schema.description;
        this.key_type = schema.key_type;

        this.fields = [];
        for (const field_conf of schema.fields) {
            this.addField(field_conf);
        }
    }

    get id() { return this._id; }
    set id(value) { this._id = value; }

    get key() { return this._key; }
    set key(value) { this._key = value; }

    get name() { return this._name; }
    set name(value) { this._name = value; }

    get description() { return this._description; }
    set description(value) { this._descriptione = value; }

    get key_type() { return this._key_type; }
    set key_type(value) {
        this._key_type = value;
        if (!KEY_TYPES.includes(this.key_type)) {
            throw new Error("Invalid key type");
        }
    }

    get fields() { return this._fields; }
    set fields(value) { this._fields = value; }
    
    addField(conf) {
        const field = new Field(conf);
        this.fields.push(field);
    }

    getSchema() { return getSchema(this.key); }
    getData() { return getData(this.key); }
    createDataFile() { createDataFile(this.key); }

    getObject() {
        return getObject(this.fields);
    }

    set(data) {
        set(data, this.fields);
    }

    static get(data_key, item_key) {
        return get(data_key, item_key);
    }
    get(key) {
        return get(this.key, key);
    }

    static create(data_key, item_key, item_data) {
        const item = new Item(data_key);
        item.set(item_data);
        item.create(item_key);
    }
    create(key) {
        return create(this.key, key, this.getObject());
    }

    static update(data_key, item_key, item_data) {
        const item = new Item(data_key);
        item.set(item_data);
        item.update(item_key);
    }
    update(key) {
        return update(this.key, key, this.getObject());
    }

    static remove(data_key, item_key) {
        return remove(data_key, item_key);
    }
    remove(key) {
        return remove(this.key, key);
    }
}

const createDataFile = (key) => {
    const path = getDataPathAbsolute(key);
    if (!Utils.fileExists(path)) {
        Utils.createJson(path, {});
    } else {
        console.log("The file already exists!");
    }
};

const getObject = (fields) => {
    const object = {};
    for (const field of fields) {
        if (field.isContainer()) {
            object[field.key] = getObject(field.fields);
        } else {
            object[field.key] = field.value;
        }
    }
    return object;
};

const set = (data, fields) => {
    for (const key in data) {
        const field = fields.find(field => field.key == key);
        if (field) {
            if (field.isContainer()) {
                set(data[key], field.fields);
            } else {
                field.value = data[key];
            }
        }
    }
};

const get = (data_key, item_key) => {
    const data = getData(data_key);
    if (item_key) {
        return data[item_key];
    }
    return data;
};

const create = (data_key, item_key, item) => {
    const data = getData(data_key);
    if (data[item_key])
        throw new Error("The item is already created for this key -> " + item_key);
    data[item_key] = item;
    Utils.createJson(getDataPathAbsolute(data_key), data);
};

const update = (data_key, item_key, item) => {
    const data = getData(data_key);
    if (!data[item_key])
        throw new Error("The item is not created for this key -> " + item_key);
    data[item_key] = item;
    Utils.createJson(getDataPathAbsolute(data_key), data);
};

const remove = (data_key, item_key) => {
    const data = getData(data_key);
    if (!data[item_key])
        throw new Error("The item is not created for this key -> " + item_key);
    delete data[item_key];
    Utils.createJson(getDataPathAbsolute(data_key), data);
};

module.exports = Item;