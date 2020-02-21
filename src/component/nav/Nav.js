import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './nav.css';

class TheNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positionY: window.pageYOffset,
      movedY: 0,
      isHidden: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  /** 效率可能擔心用太多 setState
   * 後續可以另外加上判斷來降低多餘的執行
   * 像是當前顯示 navbar 的時候就把向上滾動的指令忽略
   * 如果是向下則反
   * 另外一個 bug 是無法根據 hashtag 的東西來高亮使用中的分頁
   * 這部份跟移除 router 有關系，等到作業的最後再來處理就好
   */
  handleScroll = () => {
    const lastPositonY = this.state.positionY; // 取得舊位置
    this.setState({
      positionY: window.pageYOffset,
    }, () => this.calculateScrollWidth(lastPositonY)); // 取得新位置
  }

  calculateScrollWidth = (lastPositonY) => {
    const { movedY } = this.state;
    const ScrollWidth = window.pageYOffset - lastPositonY; // 當前位置扣掉原始位置的高度
    this.setState({ movedY: movedY + ScrollWidth, }, this.shouldHidden)
  }

  shouldHidden = () => {
    const { movedY, positionY } = this.state;
    if (movedY >= 80) {
      this.setState({
        movedY: 0,
        isHidden: true,
      })
    } else if (movedY <= -175 || positionY <= 35) {
      this.setState({
        movedY: 0,
        isHidden: false,
      })
    }
  }

  render() {
    const { isHidden } = this.state;
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        className={isHidden && "navbar--hide"}
      >
        <Navbar.Brand href="/#">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/#">首頁</Nav.Link>
            <Nav.Link href="/#posts">文章列表</Nav.Link>
            <Nav.Link href="/#about">關於我</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  };
}

export default TheNavbar;
