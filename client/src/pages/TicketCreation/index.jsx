import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { numberWithPeriods } from '@utils/allUtils';
import { } from './selectors';

import classes from './style.module.scss';
import { showPopup } from '@containers/App/actions';

const TicketCreation = ({ ticketDetail }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultVariant = { variantName: '', price: 1 };
    const { id } = useParams();

    const [formData, setFormData] = useState({});
    const [variantInput, setVariantInput] = useState(defaultVariant);
    const [imageData, setImageData] = useState(null);

    const setNewImage = (e) => {
        const imageFile = e.target.files[0];

        setImageData(imageFile);
    };

    const removeImage = () => {
        setImageData(null);
    };

    const addNewVariant = () => {
        if (variantInput?.variantName === '' || variantInput?.price === 0) {
            dispatch(showPopup('Ticket Creation', 'Harus isi semua data terlebih dahulu!'));
            return;
        }

        const variants = formData?.variants ?? [];
        variants.push(variantInput);

        setFormData(prevVal => ({ ...prevVal, variants }));
        setVariantInput(defaultVariant);
    }

    const removeVariant = (index) => {
        setFormData(prevVal => ({
            ...prevVal,
            variants: prevVal.variants.filter((_, i) => i !== index)
        }));
    };

    const saveBtn = () => {

    };

    const deleteBtn = () => {

    };

    useEffect(() => {

    }, []);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.topContentContainer}>
                <div className={classes.leftContent}>
                    <img className={classes.image} src={formData?.imageUrl ?? (imageData ? URL.createObjectURL(imageData) : '')} alt="Img failed!" />
                    <div className={classes.contentDetails}>
                        <label htmlFor='imageInput' className={classes.fileInput}>Change Image</label>
                        <input hidden id='imageInput' type="file" accept='image/*' onChange={setNewImage} />
                        <button className={classes.deleteBtn} data-type='red' onClick={() => removeImage()}>Remove Image</button>
                    </div>
                </div>
                <div className={classes.rightContent}>
                    <label className={classes.label} htmlFor='title'>Title</label>
                    <input className={classes.input} id='title' type="text" value={formData?.title} onChange={(e) => setFormData(prevVal => ({ ...prevVal, title: e.target.value }))} />
                    <label className={classes.label} htmlFor='location'>Location</label>
                    <input className={classes.input} id='location' type="text" value={formData?.location} onChange={(e) => setFormData(prevVal => ({ ...prevVal, location: e.target.value }))} />
                    <label className={classes.label} htmlFor='variants'>Variants</label>
                    <div className={classes.variantInputs}>
                        <div className={classes.variantDatas}>
                            {formData?.variants?.length > 0 ? formData?.variants?.map((variant, index) =>
                                <div className={classes.data} key={index}>
                                    <p className={classes.name}>{variant?.variantName}</p>
                                    <p className={classes.price}>Rp. {numberWithPeriods(variant?.price)}</p>
                                    <div className={classes.delBtn} data-type='red' onClick={() => removeVariant(index)}>
                                        <a>X</a>
                                    </div>
                                </div>
                            ) :
                                <div className={classes.emptyContainer}>
                                    <p><FormattedMessage id='empty_data' /></p>
                                </div>
                            }
                        </div>
                        <div className={classes.inputs}>
                            <div className={classes.inputData}>
                                <label className={classes.label} htmlFor='variantName'>Name</label>
                                <input className={classes.input} type="text" id='variantName' value={variantInput?.variantName} onChange={(e) => setVariantInput(prevVal => ({ ...prevVal, variantName: e.target.value }))} />
                            </div>
                            <div className={classes.inputData}>
                                <label className={classes.label} htmlFor='variantPrice'>Price (Rp.)</label>
                                <input className={classes.input} type="number" min={1} id='variantPrice' value={variantInput?.price} onChange={(e) => setVariantInput(prevVal => ({ ...prevVal, price: e.target.value }))} />
                            </div>
                        </div>
                        <button className={classes.addBtn} onClick={addNewVariant}>Add</button>
                    </div>
                    <label className={classes.label} htmlFor='desc'>Description</label>
                    <textarea className={classes.input} id='desc' type="text" data-type='area' value={formData?.description} onChange={(e) => setFormData(prevVal => ({ ...prevVal, description: e.target.value }))} />
                    <div className={classes.footerButtons}>
                        <button className={classes.button} onClick={saveBtn}>Save</button>
                        <button className={classes.button} data-type='red' onClick={deleteBtn}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

TicketCreation.propTypes = {
    ticketDetail: PropTypes.array
}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(TicketCreation);