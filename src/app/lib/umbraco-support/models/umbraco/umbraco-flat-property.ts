import { IUmbracoProperty } from './interface';
import { OverrideInPrototype } from '../../../core/util/decorators';

/**
 *  We need to simplify data before usage. So it's necessary to have
 *  a clean model from that we can get the only data.
 *
 * This model behave it self as composite.
 */
export class UmbracoFlatPropertyModel  {
    private descriptorKeys = ['alias', 'propertyEditorAlias'];

    constructor(
        protected data: IUmbracoProperty<any>
    ) {
        // For consistent inner usage convert scalar to default Umbraco property
        if (data && this.isScalar(data))
        {
            this.data = {
                alias: 'UmbracoFlatPropertyModel.Scalar',
                value: data,
                propertyEditorAlias: 'UmbracoFlatPropertyModel'
            }

            return;
        }

        if (data && Array.isArray(data.value))
        {
            this.data.value = this.data.value.map((i: any) => new UmbracoFlatPropertyModel(i));
            return;
        }


        if (data && typeof this.data === 'object' && this.data.value === undefined)
        {
            this.data.value = Object.keys(this.data).reduce((acc: any, prop: string) => {
                acc[prop] = new UmbracoFlatPropertyModel(data[prop]);

                return acc;
            }, {});

            return;
        }

        // For consistence we need to have an data any way.
        if (!data)
        {
            this.data = this.makeEmpty();
        }
    }

    get()
    {
        return this.data && this.data.value || '';
    }

    @OverrideInPrototype
    toString()
    {
       return this.data ? this.data.value : '';
    }

    toObject()
    {
        if (!this.data) return this.data;

        return this.data.value;
    }

    toJSON()
    {
        return this.toString();
    }

    protected isScalar(data: any)
    {
        return typeof data !== 'object';
    }

    protected createDescriptor(data: IUmbracoProperty<any>)
    {
        return this.descriptorKeys.reduce((acc: any, key: string) => {
            acc[key] = data[key]

            return acc;
        }, {});
    }

    protected makeEmpty()
    {
        return {
            alias: 'UmbracoFlatPropertyModel.Empty',
            value: '',
            propertyEditorAlias: 'UmbracoFlatPropertyModel'
        }
    }
}