import React, { Component } from 'react';

// Importando os dados necessários
import { additionalServices, products } from '../data/data'; // Certifique-se de ajustar o caminho da importação

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        email: '',
        services: [],
        favoriteProduct: '',
        observation: '',
      },
      errors: {},
      isSubmitted: false,
    };
  }

  // Regex para validar e-mail
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Função para lidar com mudanças nos inputs
  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState((prevState) => {
      const { formData } = prevState;
      if (name === 'services') {
        if (checked) {
          return {
            formData: {
              ...formData,
              services: [...formData.services, value],
            },
          };
        } else {
          return {
            formData: {
              ...formData,
              services: formData.services.filter((service) => service !== value),
            },
          };
        }
      } else {
        return {
          formData: {
            ...formData,
            [name]: value,
          },
        };
      }
    });
  };

  // Função para validar o formulário
  validate = () => {
    const { formData } = this.state;
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!this.emailRegex.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (formData.services.length === 0) {
      newErrors.services = 'Selecione pelo menos um serviço';
    }
    if (!formData.favoriteProduct.trim()) {
      newErrors.favoriteProduct = 'Selecione um produto';
    }
    return newErrors;
  };

  // Função para lidar com o envio do formulário
  handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = this.validate();
    if (Object.keys(validationErrors).length === 0) {
      // Aqui você pode adicionar a lógica para enviar os dados, como uma requisição API
      console.log('Dados do formulário:', this.state.formData); // Log para depuração
      this.setState({ isSubmitted: true });
    } else {
      this.setState({ errors: validationErrors });
    }
  };

  render() {
    const { closeModal } = this.props;
    const { formData, errors, isSubmitted } = this.state;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 px-4 py-8">
        <div className="bg-white rounded-lg w-full max-w-sm p-4 relative transform transition-transform duration-300 font-poppins mx-auto overflow-y-auto max-h-full">
          {/* Botão de fechar */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Conteúdo do Modal */}
          {!isSubmitted ? (
            <form onSubmit={this.handleSubmit} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-center text-orange-500 mb-4">Entre em Contato</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={this.handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={this.handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Serviços que gostaria de assinar
                </label>
                <div className="mt-2 space-y-1">
                  {additionalServices.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`service-${index}`}
                        name="services"
                        type="checkbox"
                        value={service.title}
                        checked={formData.services.includes(service.title)}
                        onChange={this.handleChange}
                        className="h-4 w-4 text-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`service-${index}`} className="ml-2 text-sm text-gray-700">
                        {service.title}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      id="service-unsure"
                      name="services"
                      type="checkbox"
                      value="Não tenho certeza"
                      checked={formData.services.includes('Não tenho certeza')}
                      onChange={this.handleChange}
                      className="h-4 w-4 text-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-unsure" className="ml-2 text-sm text-gray-700">
                      Não tenho certeza
                    </label>
                  </div>
                </div>
                {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
              </div>

              <div>
                <label htmlFor="favoriteProduct" className="block text-sm font-medium text-gray-700">
                  Qual produto você mais gostou?
                </label>
                <select
                  name="favoriteProduct"
                  id="favoriteProduct"
                  value={formData.favoriteProduct}
                  onChange={this.handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.favoriteProduct ? 'border-red-500' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  required
                >
                  <option value="">Selecione um produto</option>
                  {products.map((product, index) => (
                    <option key={index} value={product.title}>
                      {product.title}
                    </option>
                  ))}
                </select>
                {errors.favoriteProduct && (
                  <p className="text-red-500 text-xs mt-1">{errors.favoriteProduct}</p>
                )}
              </div>

              <div>
                <label htmlFor="observation" className="block text-sm font-medium text-gray-700">
                  Observação (opcional)
                </label>
                <textarea
                  name="observation"
                  id="observation"
                  value={formData.observation}
                  onChange={this.handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  rows="3"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4 text-orange-500">Enviado com sucesso!</h2>
              <p className="text-sm">Em breve você receberá um e-mail com as informações da proposta comercial.</p>
              <button
                onClick={closeModal}
                className="mt-6 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 transition-colors"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ModalComponent;
