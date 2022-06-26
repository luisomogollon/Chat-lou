import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import { getUsers } from '../../services'
import Modal from "../modal/Modal";
import "../modal/modal.css";
import { ChatRoomContext } from "../../context"
import swal from "sweetalert";


export default class ChatList extends Component {
  static contextType = ChatRoomContext

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      allChatUsers: [],
      searchTerm: ''
    };
  }

  filterUsers = () => {
    if (!this.state.searchTerm) return this.state.allChatUsers;
    return this.state.allChatUsers.filter(user=>user.name.match(this.state.searchTerm))
  }

  toggle = () => {
    this.setState(prev => ({ ...prev, active: !this.state.active }));
  }

  async componentDidMount() {
    try {
      const payload = await getUsers();
      const { users } = payload;
      const chatUserList = users.map((user, index) => {
        const { firstName, lastName, _id } = user;
        return { name: `${firstName} ${lastName}`, user_id: _id, key: index, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" }
      });
      this.setState.allChatusers = chatUserList;
      this.setState(prev => ({ ...prev, allChatUsers: chatUserList }))
    } catch (error) {
      console.log(error);
    }
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleComplaintSubmit = async (e) => {
    e.preventDefault();
    const payloadBody = {}


    for (const elem of e.target) {
      if (elem.name) {
        if (elem.name === 'file_64') {
          const imageFile = elem.files[0];
          if (!imageFile) {
            swal("Por favor, cargue una imagen de prueba.")
            return;
          }
          const imgBase = await this.getBase64(elem.files[0]);
          payloadBody[elem.name] = imgBase;
        } else {
          if (!elem.value) {
            swal("Es necesario escribir una descripción.")
            return;
          }
          payloadBody[elem.name] = elem.value;
        }
        elem.value = '';
      }
    }
    const { submitComplaint } = this.context;
    try {
      await submitComplaint(payloadBody)
      this.toggle();
      swal("¡Su denuncia ha sido procesada exitosamente!")
    } catch (error) {
      swal("archivo demasiado grande, max 50kb")
    }
  }

  render() {
    return (
      <div className="main__chatlist">
        <Modal active={this.state.active} toggle={this.toggle}>
          <form onSubmit={this.handleComplaintSubmit}>
            <div className="modal2" >
              <svg xmlns="http://www.w3.org/2000/svg" width="170" height="30" fill="#ca4a4adc" class="bi bi-exclamation-diamond" viewBox="0 0 17 20">
                <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              <span className="btm">¡Denuncia el Acoso!</span>
              <br />
              <br />
              <br />
              <label className="btm" htmlFor="description"> Descripción Rapida </label>
              <br />
              <br />
              <div className="bannerimp">
                <input type="text" className="form-control" name="description" />
              </div>
            </div>
            <div className="fore">
              <label className="btm" htmlFor="file_64">Incluya Captura aqui.</label>
              <input className="button64" type="file" name="file_64" />
              <button className="button65" type="submit" >Enviar</button>
            </div>
          </form>
        </Modal>
        <button onClick={this.toggle} className="btn">
          <i className="fa fa-plus"></i>
          <div> Denunciar</div>
        </button>
        <div className="chatlist__heading">
          <h2>Chats</h2>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" value={this.state.searchTerm}
              onChange={({ target: { value } }) => this.setState(prev => ({ ...prev, searchTerm: value }))}
              placeholder="Buscar usuario..." />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {this.filterUsers().map((item, index) => {
            return (
              <ChatListItems
                name={item.name}
                userId={item.user_id}
                key={item.key}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
