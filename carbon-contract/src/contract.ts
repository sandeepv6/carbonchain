// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';

interface Ticket {
  id: string;
  documentUrl: string;
  carbonReduction: string;
  percentageReduction: string;
  explanation: string;
  accountId: string;
  timestamp: number;
  status: string;
}

@NearBindgen({})
class CarbonFootprint {
  tickets: { [key: string]: Ticket[] } = {};

  @call({})
  create_ticket({ document_url, carbon_reduction, percentage_reduction, explanation, account_id }: {
    document_url: string,
    carbon_reduction: string,
    percentage_reduction: string,
    explanation: string,
    account_id: string
  }): void {
    const ticket: Ticket = {
      id: `${account_id}-${this.tickets[account_id] ? this.tickets[account_id].length : 0}`,
      documentUrl: document_url,
      carbonReduction: carbon_reduction,
      percentageReduction: percentage_reduction,
      explanation: explanation,
      accountId: account_id,
      timestamp: Date.now(),
      status: 'Pending'
    };

    if (!this.tickets[account_id]) {
      this.tickets[account_id] = [];
    }

    this.tickets[account_id].push(ticket);
    
    near.log(`Created ticket for ${account_id}`);
  }

  @call({})
  verify_ticket({ ticket_id, account_id }: { ticket_id: string, account_id: string }): void {
    const userTickets = this.tickets[account_id];
    if (!userTickets) {
      near.log(`No tickets found for ${account_id}`);
      return;
    }

    const ticket = userTickets.find(t => t.id === ticket_id);
    if (ticket) {
      ticket.status = 'Verified';
      near.log(`Verified ticket ${ticket_id} for ${account_id}`);
    } else {
      near.log(`Ticket ${ticket_id} not found for ${account_id}`);
    }
  }

  @view({})
  get_user_tickets({ account_id }: { account_id: string }): Ticket[] {
    return this.tickets[account_id] || [];
  }

  @view({})
  get_pending_tickets(): Ticket[] {
    const pendingTickets: Ticket[] = [];
    for (const accountId in this.tickets) {
      const userTickets = this.tickets[accountId];
      userTickets.forEach(ticket => {
        if (ticket.status === 'Pending') {
          pendingTickets.push(ticket);
        }
      });
    }
    return pendingTickets;
  }
}