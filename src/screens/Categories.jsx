import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';

const Categories = props => {
console.log(props)
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = useSelector(state => state.categories);

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <Toolbar 
                title="Categories"
                buttons={
                    selectedCategory ?
                        <React.Fragment>

                        </React.Fragment>
                        :
                        <LinkButton to="/new">NEW</LinkButton>
                }
            />
            <div style={{flex: 1, height: '100%'}}>
                {
                    categories.map((category, idx) => <span key={idx}>{category.name}</span>)
                }
            </div>
        </div>
    )
}

export default Categories;