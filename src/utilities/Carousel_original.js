import React from "react";

class CarouselOriginal extends React.Component {

    data = [];

    constructor() {
        super();
        this.state = {
            activeIndex: 0
        }
        // TODO Ken: Fill data array by using the read backend query
        let lorem = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ";
        for (let i = 1; i <= 8; i++) {
            this.data.push(
                {id: lorem.repeat(i), key: i},
            )
        }

        this.onNextClick = this.onNextClick.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
    }
    onNextClick() {
        if(this.state.activeIndex < this.data.length - 1){
            this.setState({activeIndex: this.state.activeIndex + 1});
        } else {
            this.setState({activeIndex: 0})
        }
    }

    onPrevClick() {
        if(this.state.activeIndex > 0) {
            this.setState({activeIndex: this.state.activeIndex - 1});
        } else {
            this.setState({activeIndex: this.data.length - 1})
        }
    }
    render() {
        let sliderStyle ={
            transform:`translateX(${this.state.activeIndex * -100}%)`,
            transition: '0.2s'
        }
        return (
            <div className='container'>
                <div className='buttons'>
                    <button onClick={this.onPrevClick}>◀</button>
                    <button onClick={this.onNextClick}>▶</button>
                </div>
                <ol className='slide-container' style={sliderStyle}>
                    {this.data.map(data => {
                        return (
                            <li className="list-item" key={data.key}>{data.id}</li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}

export default CarouselOriginal;