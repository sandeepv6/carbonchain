// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';

interface Ticket {
  id: string;
  documentUrl: string;
  carbonReduction: number;
  percentageReduction: number;
  explanation: string;
  accountId: string;
  timestamp: number;
}

@NearBindgen({})
class CarbonFootprint {
  tickets: { [key: string]: Ticket[] } = {};

  @call({})
  create_ticket({ document_url, carbon_reduction, percentage_reduction, explanation, account_id }: {
    document_url: string,
    carbon_reduction: number,
    percentage_reduction: number,
    explanation: string,
    account_id: string
  }): void {
    // Create new ticket
    const ticket: Ticket = {
      id: `${account_id}-${Date.now()}`,
      documentUrl: document_url,
      carbonReduction: carbon_reduction,
      percentageReduction: percentage_reduction,
      explanation: explanation,
      accountId: account_id,
      timestamp: Date.now()
    };

    // Initialize array for user if it doesn't exist
    if (!this.tickets[account_id]) {
      this.tickets[account_id] = [];
    }

    // Add ticket to user's tickets
    this.tickets[account_id].push(ticket);
    
    near.log(`Created ticket for ${account_id}`);
  }

  @view({})
  get_user_tickets({ account_id }: { account_id: string }): Ticket[] {
    return this.tickets[account_id] || [];
  }
}