import axios from 'axios';

export class AmoCRMService {
  private readonly baseUrl = 'https://your-amocrm-domain.amocrm.ru';
  private readonly accessToken = 'your-access-token';

  async getLeads(query?: string): Promise<any> {
    const params = query ? { query } : {};
    const leadsResponse = await axios.get(`${process.env.AMOCRM_BASE_URL}/api/v4/leads`, {
      headers: {
        Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
      },
      params,
    });

    const leads = leadsResponse.data._embedded.leads;

    for (const lead of leads) {
      const contactsResponse = await axios.get(`${this.baseUrl}/api/v4/leads/${lead.id}/contacts`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      lead.contacts = contactsResponse.data._embedded.contacts;
    }

    return leads;
  }
}
