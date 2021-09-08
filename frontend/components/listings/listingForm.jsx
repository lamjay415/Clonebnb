import React from 'react';
import { Link } from 'react-router-dom';
import FormCompleted from '../popup/formCompleted';
import Select from 'react-select';

class ListingForm extends React.Component{

    constructor(props){
        super(props)
        this.state = this.props.listing;
        this.state.completed = false;
        this.state.previewPics = [];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        const {photos} = this.state;
        formData.append('listing[user_Id]', this.state.user_id);
        formData.append('listing[title]', this.state.title);
        formData.append('listing[description]', this.state.description);
        formData.append('listing[property_type_group]', this.state.propertyTypeGroup);
        formData.append('listing[property_type]', this.state.propertyType);
        formData.append('listing[privacy_type]', this.state.privacyType);
        formData.append('listing[price]', this.state.price);
        formData.append('listing[location]', this.state.location);
        formData.append('listing[max_guests]', this.state.maxGuests);
        formData.append('listing[num_bedrooms]', this.state.numBedrooms);
        formData.append('listing[num_bathrooms]', this.state.numBathrooms);
        formData.append('listing[num_beds]', this.state.numBeds);
        formData.append('listing[amenities]', this.state.amenities);
        for(let i = 0; i < photos.length; i++){
            formData.append("listing[photos][]", photos[i]);
        }
        if(!this.state.completed){
            $.ajax({
                url: '/api/listings',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false
            }).then((() => this.setState({completed:true})));
        }
        // const listing = Object.assign({}, this.state);
        // this.props.processForm(listing).then(() => this.setState({completed:true}));
    }


    update(field) {
        return e => {
            this.setState({[field]: e.currentTarget.value}, ()=>console.log(this.state));
        };
    }

    handleFile(e){
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        // const preview = document.querySelector('img');
        let photos = this.state.photos;
        reader.onloadend = () => {
            photos.push(file);
            this.setState({ imageUrl: reader.result, photos: photos });
            this.createPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            this.setState({ imageUrl: "", photos: this.state.photos });
        }
    }

    createPreview(src){
        let previews = this.state.previewPics;
        previews.push(src);
        this.setState({previewPics: previews});
    }

    render(){
        const propTypeGroupOpts = [
            {value:'Apartment', label:'Apartment'}, 
            {value:'House', label:'House'}, 
            {value:'Secondary Unit', label:'Secondary Unit'}, 
            {value:'Unique Space', label:'Unique Space'}, 
            {value:'Hotel/Motel', label:'Hotel/Motel'}
        ];

        const propTypeOpts = {
            'Apartment': [{
                value: 'Rental Unit', label: 'Rental Unit'},
                {value: 'Condo', label: 'Condo'},
                {value: 'Loft', label: 'Loft'},
                {value: 'Studio', label: 'Studio'}],
            'House': [
                {value: 'Residential Home', label: 'Residential Home'},
                {value: 'Cabin', label: 'Cabin'},
                {value: 'Villa', label: 'Villa'},
                {value: 'Farm Stay', label: 'Farm Stay'},
                {value: 'Mansion', label: 'Mansion'}
            ],
            'Secondary Unit':[
                {value: 'Guesthouse', label: 'Guesthouse'},
                {value: 'Guest Suite', label: 'Guest Suite'},
                {value: 'Farm Stay', label: 'Farm Stay'}
            ],
            'Unique Space': [
                {value: 'Barn', label: 'Barn'},
                {value: 'Boat', label: 'Mansion'},
                {value: 'Tree House', label: 'Tree House'},
                {value: 'Castle', label: 'Castle'},
                {value: 'Pension', label: 'Pension'},
                {value: 'Camper/RV', label: 'Camper/RV'}
            ],
            "Hotel/Motel": [
                {value: 'Hotel', label: 'Hotel'},
                {value: 'Resort', label: 'Resort'},
                {value: 'Aparthotel', label: 'Aparthotel'},
                {value: 'Serviced Apartment', label: 'Serviced Apartment'},
                {value: 'Boutique hotel', label: 'Boutique hotel'}
            ]
        }
        
        const privacyTypeOpts = [
            {value: 'An entire place', label: 'An entire place'},
            {value: 'A private room', label: 'A private room'},
            {value: 'A shared room', label: 'A shared room'},
        ]
        console.log(this.state);
        return (
            <div className='listing-form-container'>
                {this.state.completed ? <FormCompleted formType={this.props.formType}/> : null}
                <div className='form-graphics'>
                    <Link to='/' className='link'>airjnj</Link>
                    <div className='graphics-text'>Hosting makes Airjnj, Airjnj</div>
                </div>
                <div className='form-side-container'>
                    <form onSubmit={this.handleSubmit} className='listing-form'>
                            <div>Property Type Group: </div>
                            <Select options={propTypeGroupOpts} defaultValue={'--Select One--'} onChange={(e)=> this.setState({propertyTypeGroup: e.value})}/>
                            <div>Property Type: </div>
                            <Select options={propTypeOpts[this.state.propertyTypeGroup]} defaultValue={'--Select One--'} onChange={(e)=> this.setState({propertyType: e.value})}/>
                            <div>Privacy Type: </div>
                            <Select options={privacyTypeOpts} defaultValue={'--Select One--'} onChange={(e)=> this.setState({privacyType: e.value})}/>
                            <div>Location: </div>
                            <input type="text"
                                value={this.state.location}
                                onChange={this.update('location')}
                            />
                            <div>Max Guests:  </div>
                            <input type="number"
                                value={this.state.maxGuests > 0 ? this.state.maxGuests : ''}
                                onChange={this.update('maxGuests')}
                            />
                            <div>Bedrooms:  </div>
                            <input type="number"
                                value={this.state.numBedrooms> 0 ? this.state.numBedrooms : ''}
                                onChange={this.update('numBedrooms')}
                            />
                            <div>Beds:  </div>
                            <input type="number"
                                value={this.state.numBeds > 0 ? this.state.numBeds : ''}
                                onChange={this.update('numBeds')}
                            />
                            <div>Bathrooms:  </div>
                            <input type="number"
                                value={this.state.numBathrooms> 0 ? this.state.numBathrooms : ''}
                                onChange={this.update('numBathrooms')}
                            />
                            <div>Amenities  </div>
                            <input type="text"
                                value={this.state.amenities}
                                onChange={this.update('amenities')}
                            />
                            <div>Price per day:  </div>
                            <input type="number"
                                value={this.state.price > 0 ? this.state.price : ''}
                                onChange={this.update('price')}
                            />
                            <div>Title:  </div>
                            <input type="text"
                                value={this.state.title}
                                onChange={this.update('title')}
                            />
                            <div>Description  </div>
                            <textarea
                                value={this.state.description}
                                onChange={this.update('description')}
                            />
                            <div>
                            {this.state.previewPics.map((src,indx)=>{
                                return <img src={src} key={`img${indx}`} height='75'/>
                            })}
                            </div>
                            {this.props.formType==='Create Listing' ? (
                                <input 
                                    type ="file"
                                    onChange={this.handleFile}
                                    multiple
                                />
                            ) : null }
                            <input type = "submit" value={this.props.formType} className='form-button'/>
                        </form>
                    </div>
                </div>
        )
    }

}
export default ListingForm;